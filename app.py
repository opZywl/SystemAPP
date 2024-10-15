
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

def fetch_data():


        conn = psycopg2.connect(**DB_CONFIG)
        query = f"""
        
            SELECT 
            c.nome AS cliente_nome,
            c.sobrenome AS cliente_sobrenome,
            d.nome AS dentista_nome,
            a.service,
            a.status,
            a.date
        FROM 
            agendamentos a
        JOIN 
            clientes c ON a.id_cliente = c.id
        JOIN 
            dentistas d ON a.id_dentista = d.id;

        """
    

        df = pd.read_sql_query(query, conn)
        

        conn.close()
        
        return df


def generate_json():
    df = fetch_data()
    
    if df is not None:

        result = df.to_json(orient='records')
        
        with open('clientes.json', 'w') as f:
            f.write(result)
        print("JSON gerado com sucesso!")


if __name__ == '__main__':
    generate_json()
