from flask import Flask, jsonify
from flask_cors import CORS
from app import read_data  

app = Flask(__name__)
CORS(app)

@app.route('/clientes', methods=['GET'])
def get_clientes():
    data = read_data('clientes', 'id')
    return jsonify(data)  


@app.route('/dentistas', methods=['GET'])
def get_dentistas():
    data = read_data('dentistas', 'cracha')
    return jsonify(data)  


@app.route('/agendamentos', methods=['GET'])
def get_agendamentos():
    data = read_data('agendamentos', 'id')
    return jsonify(data)  

if __name__ == '__main__':
    app.run(debug=True)  