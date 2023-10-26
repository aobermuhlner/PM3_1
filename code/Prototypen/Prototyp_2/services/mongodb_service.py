from pymongo import MongoClient

def get_db():
    client = MongoClient("mongodb://localhost:27017/")
    return client['exampledb']


def get_college_collection():
    db = get_db()
    return db['colleges']


def get_amenities_collection():
    db = get_db()
    return db['amenities']