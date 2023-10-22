from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
import logging

app = Flask(__name__)
logging.basicConfig(level=logging.DEBUG)

# MongoDB configuration
client = MongoClient("mongodb://localhost:27017/")
db = client['exampledb']
collection = db['examplecollection']

@app.route('/')
def index():
    return render_template('index.html')

def get_coordinates_from_results(results):
    try:
        coordinates = []
        for document in results:
            attrs = document.get("attrs", {})
            if "lat" in attrs and "lon" in attrs:
                coordinates.append({"lat": attrs["lat"], "lon": attrs["lon"]})
        return coordinates
    except Exception as e:
        logging.error(f"Error processing results: {e}")
        return []


@app.route('/filter_by_zoomlevel', methods=['POST'])
def filter_by_zoomlevel():
    try:
        zoom_level = request.form.get('zoomlevel')
        if zoom_level is None:
            return jsonify({"error": "zoomlevel parameter is missing"}), 400
        zoom_level = int(zoom_level)
        
        results = collection.find({"results.zoomlevel": zoom_level})
        print(results)
        coordinates = get_coordinates_from_results(results)
        print(coordinates)
        return jsonify(coordinates)
    except ValueError:
        return jsonify({"error": "Invalid zoomlevel"}), 400
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500

@app.route('/filter_by_schoolshort', methods=['POST'])
def filter_by_schoolshort():
    try:
        schoolshort = request.form.get('schoolshort')
        if not schoolshort:
            return jsonify({"error": "schoolshort parameter is missing"}), 400
        
        results = collection.find({"results.schoolshort": schoolshort})
        coordinates = get_coordinates_from_results(results)
        return jsonify(coordinates)
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500

if __name__ == '__main__':
    app.run(debug=True)

