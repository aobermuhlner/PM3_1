import gridfs
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client['university']
fs = gridfs.GridFS(db)

with open('C:/Users/aober/Documents/Data Science Studium/3Semester/SoftwareProject3/osm-output/osm-output.json', 'rb') as file:
    fs.put(file, filename="openstreet_data")