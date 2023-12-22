import logging
from pymongo import MongoClient

# Configure logging to write to a file
logging.basicConfig(
    filename='mongodb_errors.log',  # Name of the log file
    filemode='a',  # Append mode
    level=logging.ERROR,  # Logging level
    format='%(asctime)s - %(levelname)s - %(message)s'  # Log message format
)

def get_db():
    client = MongoClient("mongodb://localhost:27017/")
    try:
        # Connect to MongoDB
        client.admin.command('ismaster')
        return client['exampledb']
    except Exception as e:
        logging.error("Failed to connect to MongoDB: %s", e, exc_info=True)
        raise Exception("Failed to connect to MongoDB: " + str(e))

def get_college_collection():
    try:
        db = get_db()
        return db['colleges']
    except Exception as e:
        logging.error("Failed to connect to colleges collection: %s", e, exc_info=True)
        raise Exception("Failed to connect to colleges collection: " + str(e))

def get_amenities_collection():
    try:
        db = get_db()
        return db['amenities']
    except Exception as e:
        logging.error("Failed to connect to amenities collection: %s", e, exc_info=True)
        raise Exception("Failed to connect to amenities collection: " + str(e))

