from flask import Blueprint, jsonify, request
from services.mongodb_service import get_db, get_amenities_collection
from pymongo import MongoClient
from geopy.distance import geodesic
from pymongo.errors import ConnectionFailure
import logging

# Configure logging to write to a file
logging.basicConfig(
    filename='amenitiespy.log',
    filemode='a',
    level=logging.ERROR,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

bp = Blueprint('amenities', __name__)

@bp.route('/some_route')
def some_route():
    db = get_db()
    # Logic related to amenities goes here...
    return jsonify({"message": "This is an example from amenities.py"})
    
    
    


@bp.route('/get_amenitites_nearby')
def get_nearby_amenities(latitude, longitude, distance_km=0.5, limit=10000):
    """
    Function to get nearby amenities based on a center point and a specified distance.
    Uses geodesic calculations to determine the area of interest and performs a MongoDB query.
    """

    # Calculate points in all four cardinal directions.
    # The center point is defined as a tuple (Latitude, Longitude)
    center_point = (latitude, longitude)

    # Determine the four points around the center that define the area.
    # We provide the 'destination' function with the direction (azimuth) in degrees:
    # 0 degrees for North, 180 for South, 90 for East, and 270 for West.
    north = geodesic(kilometers=distance_km).destination(center_point, 0)
    south = geodesic(kilometers=distance_km).destination(center_point, 180)
    east = geodesic(kilometers=distance_km).destination(center_point, 90)
    west = geodesic(kilometers=distance_km).destination(center_point, 270)

    # Define the latitude and longitude ranges.
    # These define the rectangular area around the center.
    lat_range = (south.latitude, north.latitude)
    lon_range = (west.longitude, east.longitude)

    

    try:
        # Connect to MongoDB
        collection = get_amenities_collection()
    except Exception as e:
        # Print any error encountered during the connection attempt
        #print("Fehler beim Abrufen der Datenbankliste:", e)
        logging.error("Error in get_nearby_amenities: %s", e, exc_info=True)


    # Create the query to find documents whose coordinates are within the defined range
    # We use MongoDB query operators '$gte' (greater than or equal) and '$lte' (less than or equal)
    # to check if the 'lat' and 'lon' values are within the calculated range limits
    query = {
        'lat': {'$gte': lat_range[0], '$lte': lat_range[1]},
        'lon': {'$gte': lon_range[0], '$lte': lon_range[1]}
    }

    # Execute the query in the database
    # 'find()' returns a cursor that iterates through the found documents
    results = collection.find(query).limit(limit)
    return list(results)


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
