from flask import Blueprint, request, jsonify
from models import User, db
from werkzeug.security import generate_password_hash, check_password_hash

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'message': 'Username, email, and password are required'}), 400

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'message': 'Username already taken'}), 409 # Conflict

    existing_email = User.query.filter_by(email=email).first()
    if existing_email:
        return jsonify({'message': 'Email already registered'}), 409 # Conflict

    password_hash = generate_password_hash(password)
    new_user = User(username=username, email=email, password_hash=password_hash)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201 # Created

@auth_bp.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password_hash, password):
        # In a real application, you would generate and return a JWT token here for authentication
        return jsonify({'message': 'Login successful', 'username': user.username, 'user_id': user.user_id}), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401 # Unauthorized

@auth_bp.route('/user/<int:user_id>', methods=['GET'])
def get_user_profile(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404 # Not Found

    user_profile = {
        'user_id': user.user_id,
        'username': user.username,
        'email': user.email,
        'preferences': user.preferences or {}
        # In a real application, you might include more profile information
    }
    return jsonify(user_profile), 200