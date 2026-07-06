


# import os
# from flask import Flask, jsonify
# from flask_sqlalchemy import SQLAlchemy
# from flask_cors import CORS
# from flask_jwt_extended import JWTManager
# from app.config import config

# db = SQLAlchemy()
# jwt = JWTManager()

# def create_app(config_name='development'):
#     app = Flask(__name__, instance_relative_config=True)
#     os.makedirs(app.instance_path, exist_ok=True)
    
#     # Force Flask to accept paths with or without trailing slashes globally
#     app.url_map.strict_slashes = False
    
#     config_obj = config.get(config_name, config['default'])
#     app.config.from_object(config_obj)
    
#     app.config['SQLALCHEMY_DATABASE_URI'] = config_obj.SQLALCHEMY_DATABASE_URI
#     app.config['JWT_SECRET_KEY'] = config_obj.JWT_SECRET_KEY
    
#     db.init_app(app)
#     jwt.init_app(app)
    
#     # ----------------------------------------------------------------------
#     # Expanded Global CORS Configuration Matrix
#     # Handles string domains, explicit IP allocations, and dynamic wildcards
#     # Catch-all rule changed from r"/api/*" to r"/*" to prevent preflight drop
#     # ----------------------------------------------------------------------
#     CORS(app, resources={r"/*": {
#         "origins": [
#             "http://localhost:3000", 
#             "http://127.0.0.1:3000",
#             "http://localhost:5000",
#             "http://127.0.0.1:5000"
#         ],
#         "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
#         "allow_headers": ["Content-Type", "Authorization", "Accept", "X-Requested-With"],
#         "expose_headers": ["Content-Type", "Authorization"],
#         "supports_credentials": True,
#         "max_age": 3600  # Caches preflight responses locally for 1 hour
#     }})
    
#     with app.app_context():
#         from .routes import auth_bp, student_bp, courses_bp, admin_bp, team_rooms_bp, battles_bp, library_bp, revision_bp, ai_twin_bp
#         from . import models

#         app.register_blueprint(auth_bp, url_prefix='/api/auth')
#         app.register_blueprint(student_bp, url_prefix='/api/student')
#         app.register_blueprint(courses_bp, url_prefix='/api/courses')
#         app.register_blueprint(admin_bp, url_prefix='/api/admin')
#         app.register_blueprint(team_rooms_bp, url_prefix='/api/team-rooms')
#         app.register_blueprint(battles_bp, url_prefix='/api/battles')
#         app.register_blueprint(library_bp, url_prefix='/api/library')
#         app.register_blueprint(revision_bp, url_prefix='/api/revision')
        
#         # Keep this registered cleanly under /api to make direct service requests fully structural
#         app.register_blueprint(ai_twin_bp, url_prefix='/api')

#         @app.route('/', methods=['GET'])
#         def health_check():
#             return jsonify({'message': 'MindBridge backend is running'}), 200

#         @app.route('/api/routes', methods=['GET'])
#         def list_routes():
#             routes = []
#             for rule in app.url_map.iter_rules():
#                 methods = sorted(rule.methods - {'HEAD','OPTIONS'})
#                 routes.append({
#                     'path': str(rule.rule),
#                     'methods': methods,
#                     'endpoint': rule.endpoint,
#                 })
#             return jsonify({'routes': routes}), 200

#         @app.route('/favicon.ico')
#         def favicon():
#             return '', 204
        
#         db.create_all()
        
#     return app





import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from app.config import config

db = SQLAlchemy()
jwt = JWTManager()

def create_app(config_name='development'):
    app = Flask(__name__, instance_relative_config=True)
    os.makedirs(app.instance_path, exist_ok=True)
    
    # Force Flask to accept paths with or without trailing slashes globally
    app.url_map.strict_slashes = False
    
    config_obj = config.get(config_name, config['default'])
    app.config.from_object(config_obj)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = config_obj.SQLALCHEMY_DATABASE_URI
    app.config['JWT_SECRET_KEY'] = config_obj.JWT_SECRET_KEY
    
    db.init_app(app)
    jwt.init_app(app)
    
    # ----------------------------------------------------------------------
    # Expanded Global CORS Configuration Matrix
    # Handles string domains, explicit IP allocations, and dynamic wildcards
    # ----------------------------------------------------------------------
    CORS(app, resources={r"/*": {
        "origins": [
            "http://localhost:3000", 
            "http://127.0.0.1:3000",
            "http://localhost:5000",
            "http://127.0.0.1:5000"
        ],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
        "allow_headers": ["Content-Type", "Authorization", "Accept", "X-Requested-With"],
        "expose_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True,
        "max_age": 3600  # Caches preflight responses locally for 1 hour
    }})
    
    with app.app_context():
        from .routes import auth_bp, student_bp, courses_bp, admin_bp, team_rooms_bp, battles_bp, library_bp, revision_bp, ai_twin_bp
        from . import models

        app.register_blueprint(auth_bp, url_prefix='/api/auth')
        app.register_blueprint(student_bp, url_prefix='/api/student')
        app.register_blueprint(courses_bp, url_prefix='/api/courses')
        app.register_blueprint(admin_bp, url_prefix='/api/admin')
        app.register_blueprint(team_rooms_bp, url_prefix='/api/team-rooms')
        app.register_blueprint(battles_bp, url_prefix='/api/battles')
        app.register_blueprint(library_bp, url_prefix='/api/library')
        app.register_blueprint(revision_bp, url_prefix='/api/revision')
        app.register_blueprint(ai_twin_bp, url_prefix='/api')

        @app.route('/', methods=['GET'])
        def health_check():
            return jsonify({'message': 'MindBridge backend is running'}), 200

        @app.route('/api/routes', methods=['GET'])
        def list_routes():
            routes = []
            for rule in app.url_map.iter_rules():
                methods = sorted(rule.methods - {'HEAD','OPTIONS'})
                routes.append({
                    'path': str(rule.rule),
                    'methods': methods,
                    'endpoint': rule.endpoint,
                })
            return jsonify({'routes': routes}), 200

        @app.route('/favicon.ico')
        def favicon():
            return '', 204
        
        db.create_all()
        
    return app