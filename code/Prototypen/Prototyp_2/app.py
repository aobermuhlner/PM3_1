from flask import Flask
from filters import amenities, colleges

<<<<<<< HEAD
app = Flask(__name__, static_url_path='', static_folder='static')
=======
app = Flask(__name__, static_folder='images')
>>>>>>> c3753c687ab8881eb8d6f4b941a26fc461df45d1
app.register_blueprint(amenities.bp, url_prefix='/amenities')
app.register_blueprint(colleges.bp, url_prefix='/colleges')

if __name__ == '__main__':
    app.run(debug=True)
