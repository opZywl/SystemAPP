from flask import Flask, jsonify
import json
from flask_cors import CORS  

app = Flask(__name__)
CORS(app) 

@app.route('/clientes', methods=['GET'])
def clientes():
    try:
        with open('clientes.json', 'r') as f:
            data = json.load(f)
        return jsonify(data)
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Could not load JSON'}), 500

if __name__ == '__main__':
    app.run(port=5000)
