import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'aanand' # Change this to a strong, random key in production
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'postgresql://postgres:aanand@localhost:5432/learning_platform_db' # Replace with your actual DB URI or use environment variable
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = True # Enable debug mode during development