import json

# Load and parse the JSON file
with open('your_data.json') as f:
    data = json.load(f)
    # Extracting the 'results' items
    locations = data['results']


from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def map_view():
    # Pass the locations to your HTML file
    return render_template("map.html", locations=locations)

if __name__ == "__main__":
    app.run(debug=True)
