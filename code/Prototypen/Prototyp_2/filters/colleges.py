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

@bp.route("/get_amenitites_nearby", methods=['GET'])
def get_nearby_amenities(
    latitude, longitude, distance_km=0.5, category=None, limit=10000
):
    """
    Function to get nearby amenities based on a center point and a specified distance.
    Uses centerSphere calculations to determine the area of interest and performs a MongoDB query.
    """

    try:
        # Connect to MongoDB
        collection = get_amenities_collection()
    except Exception as e:
        # Print any error encountered during the connection attempt
        # print("Fehler beim Abrufen der Datenbankliste:", e)
        logging.error("Error in get_nearby_amenities: %s", e, exc_info=True)

        # Define the center point (longitude, latitude) and radius in radians
    center_point = [longitude, latitude]
    radius_radians = distance_km / 6371  # Earth's radius in kilometers
    query = {
        "location": {"$geoWithin": {"$centerSphere": [center_point, radius_radians]}}
    }

    # Execute the query in the database
    # 'find()' returns a cursor that iterates through the found documents
    results = collection.find(query).limit(limit)
    # Food and Beverage Services
    food_beverage_services = [
        "bar",
        "cafe",
        "fast_food",
        "food_court",
        "restaurant",
        "pub",
    ]

    # Entertainment and Cultural Venues
    entertainment_cultural = [
        "arts_centre",
        "casino",
        "cinema",
        "events_venue",
        "music_venue",
        "nightclub",
        "theatre",
    ]

    # Public and Civic Services
    public_civic_services = [
        "library",
        "atm",
        "bank",
        "police",
        "post_box",
        "post_office",
    ]

    # Transportation and Health Services
    transportation_health = [
        "bus_station",
        "bicycle_parking",
        "bicycle_repair_station",
        "doctors",
        "hospital",
        "pharmacy",
    ]
    # return the category

    if category == "fbs":
        return jsonify(
            [doc for doc in results if doc.get("amenity") in food_beverage_services]
        )

    elif category == "ecv":
        return jsonify(
            [doc for doc in results if doc.get("amenity") in entertainment_cultural]
        )
    elif category == "pcs":
        return jsonify(
            [doc for doc in results if doc.get("amenity") in public_civic_services]
        )
    elif category == "ths":
        return jsonify(
            [doc for doc in results if doc.get("amenity") in transportation_health]
        )
    elif category is None:
        # Handle the None case as needed
        return jsonify(list(results))
    else:
        return jsonify(list(results))



if __name__ == "__main__":
    # Coordinates of the center and distance are set again
    latitude = 47.49652862548828
    longitude = 8.719242095947266