from pymongo import MongoClient
from geopy.distance import geodesic
from pymongo.errors import ConnectionFailure

# Koordinaten des Zentrums und Distanz festlegen
latitude = 47.49652862548828
longitude = 8.719242095947266
distance_km = 0.5  # Umrechnung von 500 Metern in Kilometer für die geopy Bibliothek

# Berechnen der Punkte in allen vier Himmelsrichtungen
# Der Mittelpunkt wird als Tuple (Latitude, Longitude) definiert
center_point = (latitude, longitude)

# Bestimmen der vier Punkte um das Zentrum herum, die den Bereich definieren
# Der 'destination'-Funktion wird jeweils die Richtung (Azimut) als Grad übergeben:
# 0 Grad für Norden, 180 für Süden, 90 für Osten und 270 für Westen
north = geodesic(kilometers=distance_km).destination(center_point, 0)
south = geodesic(kilometers=distance_km).destination(center_point, 180)
east = geodesic(kilometers=distance_km).destination(center_point, 90)
west = geodesic(kilometers=distance_km).destination(center_point, 270)

# Erstellen der Bereichsangaben für Breiten- und Längengrade
# Diese definieren den rechteckigen Bereich um das Zentrum
lat_range = (south.latitude, north.latitude)
lon_range = (west.longitude, east.longitude)

# Verbindung zur MongoDB herstellen
# Hier verwenden wir die lokale Instanz von MongoDB mit dem Standardport
client = MongoClient('mongodb://localhost:27017/')

try:
    client = MongoClient('mongodb://localhost:27017/')
    # Versuchen, eine Operation durchzuführen, um die Verbindung zu testen
    client.admin.command('ismaster')
    print("MongoDB-Verbindung erfolgreich.")
except ConnectionFailure:
    print("MongoDB-Verbindung fehlgeschlagen.")
# Auswahl der Datenbank und der Sammlung (Collection)
try:
    databases = client.list_database_names()
    print("Verfügbare Datenbanken:", databases)
except Exception as e:
    print("Fehler beim Abrufen der Datenbankliste:", e)


db = client['exampledb']
# Liste der Collections in der Datenbank abrufen
collections = db.list_collection_names()
print("Verfügbare Collections:", collections)

collection = db['amenities']

# Erstellen der Abfrage, um Dokumente zu finden, deren Koordinaten im definierten Bereich liegen
# Wir nutzen hier die MongoDB Query Operatoren '$gte' (greater than or equal) und '$lte' (less than or equal),
# um zu überprüfen, ob die 'lat' und 'lon' Werte innerhalb der berechneten Bereichsgrenzen liegen
query = {
    'lat': {'$gte': lat_range[0], '$lte': lat_range[1]},
    'lon': {'$gte': lon_range[0], '$lte': lon_range[1]}
}

# Durchführen der Abfrage in der Datenbank
# 'find()' gibt einen Cursor zurück, der die gefundenen Dokumente durchläuft
results = collection.find(query).limit(1000)

# Ausgabe der Dokumente, die innerhalb des Bereichs liegen
# Wir iterieren über den Cursor und drucken jedes Dokument.
# Die Dokumente werden in der Form ausgegeben, wie sie in MongoDB gespeichert sind.
for document in results:
    print(document)
