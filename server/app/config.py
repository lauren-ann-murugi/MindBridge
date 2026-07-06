import os
from datetime import timedelta

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
INSTANCE_DIR = os.path.join(BASE_DIR, 'instance')
SQLITE_DB_PATH = os.path.join(INSTANCE_DIR, 'mindbridge.db')

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key'
    DEBUG = False
    TESTING = False
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=30)
    CORS_ALLOWED_ORIGINS = ['http://localhost:3000', 'http://localhost:5000']
    PERMANENT_SESSION_LIFETIME = timedelta(days=7)

    @property
    def SQLALCHEMY_DATABASE_URI(self):
        """Dynamically source database URL fallback string cleanly"""
        return os.environ.get('DATABASE_URL') or f'sqlite:///{SQLITE_DB_PATH}'

    @property
    def JWT_SECRET_KEY(self):
        return os.environ.get('JWT_SECRET_KEY') or 'your-secret-key-change-in-production'

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

class TestingConfig(Config):
    TESTING = True
    
    @property
    def SQLALCHEMY_DATABASE_URI(self):
        return 'sqlite:///:memory:'

config = {
    'development': DevelopmentConfig(),
    'production': ProductionConfig(),
    'testing': TestingConfig(),
    'default': DevelopmentConfig()
}