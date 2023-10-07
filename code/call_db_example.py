import gridfs
from pymongo import MongoClient
import json

# Connect to MongoDB and initialize GridFS
client = MongoClient('localhost', 27017)
db = client['university']
fs = gridfs.GridFS(db)

# Retrieve the file from GridFS
file_data = fs.get_last_version(filename="openstreet_data")

# Read the content of the file directly into memory
content = file_data.read()

# Assuming the content is JSON, load it into a Python dictionary
data = json.loads(content.decode('utf-8'))

# Now, 'data' is a Python object containing the content of your file.
# You can process 'data' directly in your application.
print(data)
