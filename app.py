from flask import Flask, jsonify
import pymongo

app = Flask(__name__)
mongo = pymongo.MongoClient("mongodb://localhost:27017")


@app.route('/')
def index():
    return "Hello world!"


@app.route('/api/data', methods=['GET'])
def get_data():
    return mongo['data']


@app.errorhandler(404)
def error_404():
    return "404 not found"


if __name__ == '__main__':
    app.run()
