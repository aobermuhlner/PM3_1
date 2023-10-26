from flask import Flask
from filters import amenities, colleges

app = Flask(__name__)
app.register_blueprint(amenities.bp, url_prefix='/amenities')
app.register_blueprint(colleges.bp, url_prefix='/colleges')

if __name__ == '__main__':
    app.run(debug=True)
