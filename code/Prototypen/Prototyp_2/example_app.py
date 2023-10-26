from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
import logging

app = Flask(__name__)
logging.basicConfig(level=logging.DEBUG)

# MongoDB configuration
client = MongoClient("mongodb://localhost:27017/")
db = client['exampledb']
collection = db['examplecollection']
collection_colleges = db['colleges']
collection_amenities = db['amenities']


@app.route('/')
def index():
    # Fetch all distinct 'name' from the 'colleges' collection
    college_names = list(collection_colleges.distinct('name'))

    # Render your HTML with college_names
    return render_template('index.html', college_names=college_names)



if __name__ == '__main__':
    app.run(debug=True)