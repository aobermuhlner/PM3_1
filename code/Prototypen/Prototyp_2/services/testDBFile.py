from pymongo import MongoClient

# Constants
DISTANCE_KM = 2

# Establish MongoDB connection
def get_db():
    client = MongoClient("mongodb://localhost:27017/")
    return client['exampledb']

def get_college_collection():
    db = get_db()
    return db['colleges']

def get_amenities_collection():
    db = get_db()
    return db['amenities']

def nearby_amenities(college_name):
    # Print the requested college_name to the consolerint(f"Request received for college: {college_name}")
    #
    #     # Access collections
    #     collection_colleges = get_college_collection()
    #     collection_amenities = get_amenities_collection()
    #
    #     # Find the specified college
    #     college = collection_colleges.find_one({"name": college_name})
    #
    #     # If the college is not found, print an error to the console and return an error
    #     if not college:
    #         print(f"Error: College '{college_name}' not found.")
    #         return
    #
    #     # Extract longitude and latitude of the college
    #     lon, lat = college['lon'], college['lat']
    #
    #     # Print college coordinates to the console
    #     print(f"Retrieved college coordinates: {lon}, {lat}")
    #
    #     # Find nearby amenities based on the college's location
    #     nearby_amenities = collection_amenities.find({
    #         "location": {
    #             "$near": {
    #                 "$geometry": {
    #                     "type": "Point",
    #                     "coordinates": [lon, lat]
    #                 },
    #                 "$maxDistance": DISTANCE_KM * 1000  # Convert distance from km to meters
    #             }
    #         }
    #     })
    p


    # Print the nearby amenities
    for amenity in nearby_amenities:
        print(amenity)

if __name__ == '__main__':
    college_name_input = input("Enter the name of the college: ")
    nearby_amenities(college_name_input)
