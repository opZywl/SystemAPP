import pandas as pd
import psycopg2
import json

DB_CONFIG = {
    'host': 'brashly-intent-urchin.data-1.use1.tembo.io',
    'database': 'postgres',
    'user': 'postgres',
    'password': 'iALB46OgbQd7FWXe',
    'port': 5432
}

def get_connection():
    return psycopg2.connect(**DB_CONFIG)

#----------------------------------------------------------------------------------------

def remove_duplicates(conn):
    with conn.cursor() as cursor:
        cursor.execute("""
        DELETE FROM clientes
        WHERE id NOT IN (
            SELECT MIN(id) 
            FROM clientes 
            GROUP BY nome, sobrenome, telefone, email
        );
        """)


#----------------------------------------------------------------------------------------

def create_client(nome_cliente, sobrenome_cliente, telefone, email):
    conn = get_connection()
    with conn.cursor() as cursor:
        create_cliente = """
        INSERT INTO clientes (nome, sobrenome, telefone, email) 
        VALUES (%s, %s, %s, %s);
        """
        cursor.execute(create_cliente, (nome_cliente, sobrenome_cliente, telefone, email))
        remove_duplicates(conn)
        conn.commit()

#----------------------------------------------------------------------------------------


def create_agendamento(cracha, data, service, status):
    conn = get_connection()
    with conn.cursor() as cursor:
        create_agendamento = """
        INSERT INTO agendamentos (cracha, data, service, status) 
        VALUES (%s, %s, %s, %s);
        """
        cursor.execute(create_agendamento, (cracha, data, service, status))
        remove_duplicates(conn)
        conn.commit()

#----------------------------------------------------------------------------------------

def create_dentista(cracha, nome, sobrenome, especialidade, telefone, email):
    conn = get_connection()
    with conn.cursor() as cursor:
        create_dentista = """
        INSERT INTO dentistas (cracha, nome, sobrenome, especialidade, telefone, email) 
        VALUES (%s, %s, %s, %s, %s, %s);
        """
        cursor.execute(create_dentista, (cracha, nome, sobrenome, especialidade, telefone, email))
        remove_duplicates(conn)
        conn.commit()

#----------------------------------------------------------------------------------------

def read_data(tabela, id):
    conn = get_connection()
    with conn.cursor() as cursor:
        read_data_query = f"""
            SELECT * 
            FROM {tabela}
            ORDER BY {id};
        """
        try:
            cursor.execute(read_data_query)
            columns = [desc[0] for desc in cursor.description]
            data = cursor.fetchall()
            return [dict(zip(columns, row)) for row in data]
                
        except Exception as e:
            print('Erro:', e)
            return []
        finally:
            conn.close()
#----------------------------------------------------------------------------------------


def update_cliente(id_cliente, novo_nome, novo_sobrenome, novo_telefone, novo_email):
    conn = get_connection()
    with conn.cursor() as cursor:
        update_query = f"""
        UPDATE clientes
        SET nome = %s, 
            sobrenome = %s, 
            telefone = %s, 
            email = %s
        WHERE id = %s;
        """
        cursor.execute(update_query, (novo_nome, novo_sobrenome, novo_telefone, novo_email, id_cliente))
        conn.commit()
#----------------------------------------------------------------------------------------

def update_dentista(cracha, novo_nome, novo_sobrenome, nova_especialidade, novo_telefone, novo_email):
    conn = get_connection()
    with conn.cursor() as cursor:
        update_query = """
        UPDATE dentistas
        SET nome = %s, 
            sobrenome = %s, 
            especialidade = %s, 
            telefone = %s, 
            email = %s
        WHERE cracha = %s;
        """
        cursor.execute(update_query, (novo_nome, novo_sobrenome, nova_especialidade, novo_telefone, novo_email, cracha))
        conn.commit()

#----------------------------------------------------------------------------------------


def update_agendamento(id_agendamento, novo_cracha, nova_data, novo_servico, novo_status):
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            update_query = """
            UPDATE agendamentos
            SET cracha = %s, 
                data = %s, 
                service = %s, 
                status = %s
            WHERE id = %s;
            """
            cursor.execute(update_query, (novo_cracha, nova_data, novo_servico, novo_status, id_agendamento))
            conn.commit()
            print(f"Agendamento com ID {id_agendamento} atualizado com sucesso.")
    except Exception as e:
        print(f"Erro ao atualizar agendamento: {e}")
    finally:
        conn.close()



#----------------------------------------------------------------------------------------
def delete_client(id_cliente):
    conn = get_connection()
    with conn.cursor() as cursor:
        delete_query = """
        DELETE FROM clientes
        WHERE id = %s;
        """
        cursor.execute(delete_query, (id_cliente,))
        print(f"Cliente com ID {id_cliente} foi deletado.")
        conn.commit()
        
#----------------------------------------------------------------------------------------

def delete_agendamento(id_agendamento):
    conn = get_connection()
    with conn.cursor() as cursor:
        delete_query = """
        DELETE FROM agendamentos
        WHERE id = %s;
        """
        cursor.execute(delete_query, (id_agendamento,))
        print(f"Agendamento com ID {id_agendamento} foi deletado.")
        conn.commit()

#----------------------------------------------------------------------------------------


def delete_dentista(cracha):
    conn = get_connection()
    with conn.cursor() as cursor:
        delete_query = """
        DELETE FROM dentistas
        WHERE cracha = %s;
        """
        cursor.execute(delete_query, (cracha,))
        print(f"Dentista com crachá {cracha} foi deletado.")
        conn.commit()

#----------------------------------------------------------------------------------------


def renumber_ids():
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute("""
        WITH numbered_clients AS (
            SELECT id, ROW_NUMBER() OVER (ORDER BY id) AS new_id
            FROM clientes
        )
        UPDATE clientes
        SET id = new_id
        FROM numbered_clients
        WHERE clientes.id = numbered_clients.id;
        """)
        print("IDs foram renumerados.")
        conn.commit()

#----------------------------------------------------------------------------------------


def renumber_ids_agendamentos():
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(""" 
        WITH numbered_agendamentos AS (
            SELECT id, ROW_NUMBER() OVER (ORDER BY id) AS new_id
            FROM agendamentos
        )
        UPDATE agendamentos
        SET id = new_id
        FROM numbered_agendamentos
        WHERE agendamentos.id = numbered_agendamentos.id;
        """)
        print("IDs dos agendamentos foram renumerados.")
        conn.commit()
        
#----------------------------------------------------------------------------------------

def main():
    renumber_ids_agendamentos()
    renumber_ids()

if __name__ == "__main__":
    main()