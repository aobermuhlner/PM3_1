from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# Verbindung zur MongoDB-Instanz
client = MongoClient("mongodb://localhost:27017/")
db = client['exampledb']
collection = db['examplecollection']


@app.route('/', methods=['GET', 'POST'])
def index():
    # Wenn der Benutzer das Formular absendet, erhalten wir das Zoomlevel
    if request.method == 'POST':
        zoom_level = request.form.get('zoomlevel')
        # Wir suchen nach Dokumenten, die diesem Zoomlevel entsprechen
        results = collection.find({"results.attrs.zoomlevel": int(zoom_level)})
        
        # Extrahieren von Koordinaten aus den Ergebnissen
        coordinates = []
        for result in results:
            for item in result["results"]:
                coord = {
                    "lat": item["attrs"]["lat"],
                    "lon": item["attrs"]["lon"]
                }
                coordinates.append(coord)

        # Rückgabe der Koordinaten an das Frontend
        return jsonify(coordinates)

    return render_template('index.html')



if __name__ == '__main__':
    app.run(debug=True)

