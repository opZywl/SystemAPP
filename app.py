import psycopg2
from psycopg2.extras import RealDictCursor
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="*", methods=["GET", "POST", "PUT", "DELETE"])

DB_CONFIG = {
    'host': 'brashly-intent-urchin.data-1.use1.tembo.io',
    'database': 'postgres',
    'user': 'postgres',
    'password': 'iALB46OgbQd7FWXe',
    'port': 5432
}


@app.route('/create_clientes', methods=['POST'])
def create_cliente_route():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"message": "Dados inválidos"}), 400

        nome = data.get('nome')
        sobrenome = data.get('sobrenome')
        telefone = data.get('telefone')
        email = data.get('email')
        datahora = data.get('datahora')
        servico = data.get('servico')

        if not all([nome, sobrenome, telefone, email, datahora, servico]):
            return jsonify({"message": "Todos os campos são obrigatórios."}), 400

        if is_email_registered(email):
            return jsonify({"message": "Email já registrado."}), 400

        create_cliente(nome, sobrenome, telefone, email, datahora, servico)

        return jsonify({"message": "Cliente cadastrado com sucesso!"}), 201
    except Exception as e:
        print(f"Erro ao criar cliente: {e}")
        return jsonify({"message": "Erro ao criar cliente"}), 500



@app.route('/clientes', methods=['GET'])
def get_clientes():
    try:
        conn = get_connection()
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute("SELECT * FROM clientes")
            clientes = cursor.fetchall()
            return jsonify(clientes), 200  
    except Exception as e:
        print(f"Erro ao obter clientes: {e}")
        return jsonify({"message": "Erro ao obter clientes"}), 500


@app.route('/clientes/<int:id>', methods=['GET'])
def get_cliente(id):
    try:
        conn = get_connection()
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute("SELECT * FROM clientes WHERE id = %s", (id,))
            cliente = cursor.fetchone()
            if cliente:
                return jsonify(cliente), 200  
            else:
                return jsonify({"message": "Cliente não encontrado"}), 404
    except Exception as e:
        print(f"Erro ao obter cliente: {e}")
        return jsonify({"message": "Erro ao obter cliente"}), 500


@app.route('/clientes/<int:id>', methods=['DELETE'])
def delete_cliente(id):
    try:
        conn = get_connection()
        with conn.cursor() as cursor:
            cursor.execute("DELETE FROM clientes WHERE id = %s", (id,))
            conn.commit()
            return jsonify({"message": "Cliente excluído com sucesso!"}), 200
    except Exception as e:
        print(f"Erro ao excluir cliente: {e}")
        return jsonify({"message": "Erro ao excluir cliente"}), 500


@app.route('/clientes/<int:id>', methods=['PUT'])
def update_cliente(id):
    try:
        data = request.get_json()
        if not data:
            return jsonify({"message": "Dados inválidos"}), 400

        nome = data.get('nome')
        sobrenome = data.get('sobrenome')
        telefone = data.get('telefone')
        email = data.get('email')
        datahora = data.get('datahora')
        servico = data.get('servico')

        if not all([nome, sobrenome, telefone, email, datahora, servico]):
            return jsonify({"message": "Todos os campos são obrigatórios."}), 400

        conn = get_connection()
        with conn.cursor() as cursor:
            cursor.execute("""
                UPDATE clientes
                SET nome = %s, sobrenome = %s, telefone = %s, email = %s, datahora = %s, servico = %s
                WHERE id = %s
            """, (nome, sobrenome, telefone, email, datahora, servico, id))
            conn.commit()
            return jsonify({"message": "Cliente atualizado com sucesso!"}), 200
    except Exception as e:
        print(f"Erro ao atualizar cliente: {e}")
        return jsonify({"message": "Erro ao atualizar cliente"}), 500


def is_email_registered(email):
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute("SELECT 1 FROM clientes WHERE email = %s", (email,))
        return cursor.fetchone() is not None

def create_cliente(nome, sobrenome, telefone, email, datahora, servico):
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute("""
        INSERT INTO clientes (nome, sobrenome, telefone, email, datahora, servico) 
        VALUES (%s, %s, %s, %s, %s, %s);
        """, (nome, sobrenome, telefone, email, datahora, servico))
        conn.commit()

def get_connection():
    return psycopg2.connect(**DB_CONFIG)

if __name__ == "__main__":
    app.run(debug=True)
