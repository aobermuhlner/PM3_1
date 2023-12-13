from flask import Blueprint, render_template, jsonify, request
from services.mongodb_service import get_db, get_college_collection, get_amenities_collection
import math
from filters.amenities import fetch_nearby_amenities

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



# Calculate College Score
def distanceAmenityToCollege(amenity, college):
    # Assuming 'amenity' and 'college' are dictionaries with 'lat' and 'lon' keys
 #   distance = ((amenity['lat'] - college['lat'])**2 + (amenity['lon'] - college['lon'])**2)**0.5
    # Radius of the Earth in meters
    R = 6371000

    # Convert coordinates from degrees to radians
    lat1_rad = math.radians(college['lat'])
    lon1_rad = math.radians(college['lon'])
    lat2_rad = math.radians(amenity['lat'])
    lon2_rad = math.radians(amenity['lon'])

    # Differences in coordinates
    dlat = lat2_rad - lat1_rad
    dlon = lon2_rad - lon1_rad

    # Haversine formula
    a = math.sin(dlat / 2) ** 2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = R * c

    return distance

@bp.route("/get_college_score", methods=['POST'])
def calculate_college_score():
    try:
        data = request.get_json()  # Retrieve JSON data sent from the client

        # Extract data from JSON
        amenityRelevance = data.get('amenityRelevance', [])
        colleges = data.get('colleges', [])
        distance = float(data.get('distance', 0.5))  # Default to 0.5 if not provided

        results = []

        # Convert amenityRelevance to a dictionary for easier lookup
        relevance_dict = {item['amenity']: item['relevance'] for item in amenityRelevance}

        for college in colleges:
            collegeScore = 0
            collegeAmenities = []
            # Assuming fetch_nearby_amenities function is correctly defined elsewhere
            amenities = fetch_nearby_amenities(college['lat'], college['lon'], distance)

            for amenity in amenities:
                # Assuming distanceAmenityToCollege function is correctly defined elsewhere
                distanceAmenity = distanceAmenityToCollege(amenity, college)
                relevance = relevance_dict.get(amenity['amenity'], 0)
                score = relevance / distanceAmenity if distanceAmenity != 0 else 0
                collegeScore += score

                collegeAmenities.append({
                    'amenityName': amenity['amenity'],
                    'amenityDistanceToCollege': distanceAmenity,
                    'amenityRelevance': relevance
                })
            print(college['nameCollege'])
            print(collegeScore)
            print(collegeAmenities)
            results.append({
                'CollegeName': college['nameCollege'],
                'collegeTotalScore': collegeScore,
                'amenities': collegeAmenities
            })
        print(results)

        return jsonify(results)  # Return your results in JSON format

    except Exception as e:
        # It's good practice to log the actual error for debugging
        print(f"An error occurred: {e}")
        return jsonify({'error': 'e'})




if __name__ == "__main__":
    # Coordinates of the center and distance are set again
    latitude = 47.49652862548828
    longitude = 8.719242095947266