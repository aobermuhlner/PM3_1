from flask import Blueprint, jsonify, request
from services.mongodb_service import get_db

bp = Blueprint('amenities', __name__)

@bp.route('/some_route')
def some_route():
    db = get_db()
    # Logic related to amenities goes here...
    return jsonify({"message": "This is an example from amenities.py"})
