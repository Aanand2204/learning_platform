from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config
from routes.auth_routes import auth_bp
from routes.resource_routes import resource_bp
from routes.recommendation_routes import recommendation_bp
from routes.progress_routes import progress_bp
from routes.quiz_routes import quiz_bp
from models import db  # Import 'db' instance

app = Flask(__name__)
app.config.from_object(Config)

# Initialize SQLAlchemy with the app
db.init_app(app)

# Register blueprints for different routes
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(resource_bp, url_prefix='/resources')
app.register_blueprint(recommendation_bp, url_prefix='/recommendations')
app.register_blueprint(progress_bp, url_prefix='/progress')
app.register_blueprint(quiz_bp, url_prefix='/quizzes')

@app.route('/')
def home():
    return "Welcome to the Personalized Learning Platform Backend!"

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create database tables if they don't exist
    app.run(debug=True, port=5000)