from flask import Blueprint, render_template, jsonify, request
from services.mongodb_service import get_db, get_college_collection, get_amenities_collection
import logging

bp = Blueprint('colleges', __name__)
DISTANCE_KM = 1

@bp.route('/')
def index():
    db = get_db()
    collection_colleges = db['colleges']
    college_names = list(collection_colleges.distinct('name'))

    return render_template('index.html', college_names=college_names)


@bp.route('/get_all_unique_colleges', methods=['POST'])
def get_all_unique_colleges():
    collection_colleges = get_college_collection()

    # Get all unique colleges with their _id
    unique_colleges = collection_colleges.distinct("name")

    return jsonify(list(unique_colleges))

@bp.route('/get_all_unique_cities', methods=['POST'])
def get_all_unique_cities():
    collection_colleges = get_college_collection()

    # Get all unique cities with their _id
    unique_cities = collection_colleges.distinct("city")

    return jsonify(list(unique_cities))

@bp.route('/get_colleges_by_names', methods=['POST'])
def get_colleges_by_names():
    college_names = request.json.get('college_names', [])
    collection_colleges = get_college_collection()
    colleges = collection_colleges.find({"name": {"$in": college_names}}, {"_id": 0})
    return jsonify(list(colleges))


@bp.route('/get_colleges_filtered', methods=['POST'])
def get_colleges_filtered():
    data = request.json
    categories = data.get('categories', [])
    cities = data.get('cities', [])

    collection_colleges = get_college_collection()

    query = {}
    if categories:
        query["Kategorie"] = {"$in": categories}
    if cities:
        query["city"] = {"$in": cities}

    filtered_colleges = collection_colleges.find(
        query,
        {"_id": 0, "label": 1, "lat": 1, "lon": 1}
    )

    colleges_data = list(filtered_colleges)
    return jsonify(colleges_data)



if __name__ == "__main__":
    # Coordinates of the center and distance are set again
    latitude = 47.49652862548828
    longitude = 8.719242095947266