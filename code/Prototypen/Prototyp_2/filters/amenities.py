from flask import Blueprint, jsonify, request
from services.mongodb_service import get_db, get_amenities_collection
from geopy.distance import geodesic
import logging

# Configure logging to write to a file
logging.basicConfig(
    filename="amenitiespy.log",
    filemode="a",
    level=logging.ERROR,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

bp = Blueprint("amenities", __name__)


@bp.route("/some_route")
def some_route():
    db = get_db()
    # Logic related to amenities goes here...
    return jsonify({"message": "This is an example from amenities.py"})


def fetch_nearby_amenities(latitude, longitude, distance_km, category, limit):
    """
    Core functionality to fetch nearby amenities.
    """
    try:
        # Connect to MongoDB
        collection = get_amenities_collection()
    except Exception as e:
        print(f"An error occurred: {e}")
        logging.error("Error in fetch_nearby_amenities: %s", e, exc_info=True)
        return []

    # Define the center point (longitude, latitude) and radius in radians
    center_point = [longitude, latitude]
    radius_radians = distance_km / 6371  # Earth's radius in kilometers

    query = {
        "location": {"$geoWithin": {"$centerSphere": [center_point, radius_radians]}}
    }

    projection = {"_id": 0}  # Modify as needed
    results = collection.find(query, projection).limit(limit)

    # Filtering logic based on 'category'
    if category in ["fbs", "ecv", "pcs", "ths"]:
        categories = {
            "fbs": ["bar", "cafe", "fast_food", "food_court", "restaurant", "pub"],
            "ecv": [
                "arts_centre",
                "casino",
                "cinema",
                "events_venue",
                "music_venue",
                "nightclub",
                "theatre",
            ],
            "pcs": ["library", "atm", "bank", "police", "post_box", "post_office"],
            "ths": [
                "bus_station",
                "bicycle_parking",
                "bicycle_repair_station",
                "doctors",
                "hospital",
                "pharmacy",
            ],
        }
        results = [doc for doc in results if doc.get("amenity") in categories[category]]
    else:
        results = list(results)

    return results


@bp.route("/get_amenitites_nearby", methods=["POST"])
def get_nearby_amenities():
    latitude = request.form.get("latitude", type=float)
    longitude = request.form.get("longitude", type=float)
    distance_km = request.form.get("distance_km", default=0.5, type=float)
    category = request.form.get("category")
    limit = request.form.get("limit", default=10000, type=int)
    """
    Function to get nearby amenities based on a center point and a specified distance.
    Uses centerSphere calculations to determine the area of interest and performs a MongoDB query.
    """
    docs = fetch_nearby_amenities(latitude, longitude, distance_km, category, limit)

    # Define amenity categories
    categories = {
        "fbs": ["bar", "cafe", "fast_food", "food_court", "restaurant", "pub"],
        "ecv": ["arts_centre", "casino", "cinema", "events_venue", "music_venue", "nightclub", "theatre"],
        "pcs": ["library", "atm", "bank", "police", "post_box", "post_office"],
        "ths": ["bus_station", "bicycle_parking", "bicycle_repair_station", "doctors", "hospital", "pharmacy"]
    }

    new_docs = []

    for doc in docs:
        # Assign category based on amenity type
        for category, amenities in categories.items():
            if doc.get("amenity") in amenities:
                doc['category'] = category
                break
        else:
            doc['category'] = 'other'  # Default category

        new_docs.append(doc)

    return jsonify(new_docs)

    # Return the JSON response
    return jsonify(new_docs)


@bp.route("/get_amenitites_nearby_scatter", methods=["POST"])
def get_amenities_scatterplot():
    # Extract parameters from request.form
    latitude = request.form.get("latitude", type=float)
    longitude = request.form.get("longitude", type=float)
    distance_km = request.form.get("distance_km", default=0.5, type=float)
    category = request.form.get("category")
    limit = request.form.get("limit", default=10000, type=int)

    # Call the helper function
    data = fetch_nearby_amenities(latitude, longitude, distance_km, category, limit)

    # Your input coordinates as a tuple.
    input_coordinates = (latitude, longitude)
    # Initialize a dictonary to store distances from the input coordinates to each amenity.
    distances = {}
    dictid = 0
    # Iterate through each amenity in the data.
    for item in data:
        # Extract the coordinates of the current amenity.
        object_coordinates = (item["lat"], item["lon"])

        # extract name
        name = item.get("name", item.get("amenity", "default"))

        # Calculate the geodesic distance (in meters) from the input coordinates to the amenity's coordinates.
        # 'geodesic' function computes the shortest distance over the earth's surface.
        # The '.meters' attribute converts the distance to meters.
        distance = geodesic(input_coordinates, object_coordinates).meters
        if category == "fbs":
            yaxis = 1
            distances[dictid] = (name, distance, yaxis)

        elif category == "ecv":
            yaxis = 2
            distances[dictid] = (name, distance, yaxis)
        elif category == "pcs":
            yaxis = 3
            distances[dictid] = (name, distance, yaxis)
        elif category == "ths":
            yaxis = 4
            distances[dictid] = (name, distance, yaxis)
        elif category is None:
            # Handle the None case as needed
            # Append the calculated distance to the distances dict.
            distances[dictid] = (name, distance)
        dictid += 1
    # Return the list of distances.
    # This list can be used to plot a scatterplot, where each point represents an amenity,
    # and its distance from the input coordinates.
    return jsonify(distances)


@bp.route("/get_amenitites_nearby_barrchart", methods=["POST"])
def get_amenities_barchart():
    # Extract parameters from request.form
    latitude = request.form.get("latitude", type=float)
    longitude = request.form.get("longitude", type=float)
    distance_km = request.form.get("distance_km", default=0.5, type=float)
    category = request.form.get("category")
    limit = request.form.get("limit", default=10000, type=int)
    sortbycat = request.form.get("sortbycat", default=False, type=bool)

    # Call the helper function
    data = fetch_nearby_amenities(latitude, longitude, distance_km, category, limit)

    # Get nearby amenities based on the provided latitude, longitude, and other parameters.

    # Initialize a dictionary to store counts of each amenity.
    amenity_counts = {}

    # Iterate through each item in the returned data.
    for item in data:
        amenity = item["amenity"]  # Extract the amenity type.
        # Count the occurrences of each amenity.
        if amenity in amenity_counts:
            amenity_counts[amenity] += 1
        else:
            amenity_counts[amenity] = 1

    # Convert the dictionary of amenity counts into a list of lists.
    amenity_list = [[key, value] for key, value in amenity_counts.items()]

    # If sorting by category is enabled,
    if sortbycat:
        # Define the categories.
        food_beverage_services = [
            "bar",
            "cafe",
            "fast_food",
            "food_court",
            "restaurant",
            "pub",
        ]
        entertainment_cultural = [
            "arts_centre",
            "casino",
            "cinema",
            "events_venue",
            "music_venue",
            "nightclub",
            "theatre",
        ]
        public_civic_services = [
            "library",
            "atm",
            "bank",
            "police",
            "post_box",
            "post_office",
        ]
        transportation_health = [
            "bus_station",
            "bicycle_parking",
            "bicycle_repair_station",
            "doctors",
            "hospital",
            "pharmacy",
        ]

        # Initialize a dictionary to count amenities by these categories.
        category_counts = {
            "Food and Beverage Services": 0,
            "Entertainment and Cultural Venues": 0,
            "Public and Civic Services": 0,
            "Transportation and Health Services": 0,
        }

        # Categorize and count the amenities.
        for amenity, count in amenity_list:
            if amenity in food_beverage_services:
                category_counts["Food and Beverage Services"] += count
            elif amenity in entertainment_cultural:
                category_counts["Entertainment and Cultural Venues"] += count
            elif amenity in public_civic_services:
                category_counts["Public and Civic Services"] += count
            elif amenity in transportation_health:
                category_counts["Transportation and Health Services"] += count

        # Convert the category counts to a list of lists and return it.
        category_counts_list = [
            [category, count] for category, count in category_counts.items()
        ]
        return jsonify(category_counts_list)

    # If not sorting by category, return the list of amenities as is.
    else:
        return jsonify(amenity_list)


if __name__ == "__main__":
    # Coordinates of the center and distance are set again
    latitude = 47.49652862548828
    longitude = 8.719242095947266
    distance_km = 0.5  # Convert 500 meters to kilometers for geopy library
    liste = get_nearby_amenities(latitude, longitude, 0.1)
    for doc in liste:
        # Print each document found in the defined area
        print(doc)
    # Print the number of documents found
    print(len(liste))
    print(len(liste))
    print(get_amenities_barchart(latitude, longitude, 0.5, category=""))
    print(get_amenities_scatterplot(latitude, longitude, 0.5, category=""))
    print(get_amenities_barchart(latitude, longitude, 0.1, category="", sortbycat=True))
