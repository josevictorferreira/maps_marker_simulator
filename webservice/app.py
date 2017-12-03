from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

@app.route("/coord", methods=['GET'])
def random_coord():
    latMin = float(request.args.get('latMin'))
    latMax = float(request.args.get('latMax'))
    lngMin = float(request.args.get('lngMin'))
    lngMax = float(request.args.get('lngMax'))
    data = {
        'lat': random.uniform(latMin, latMax),
        'lng': random.uniform(lngMin, lngMax)
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
