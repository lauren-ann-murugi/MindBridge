import os
import sys
from dotenv import load_dotenv

# Force Python to recognize the current directory for absolute module targeting
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from app import create_app, db

# Explicitly load environment configurations
load_dotenv()

env_profile = os.environ.get('FLASK_ENV', 'development')
app = create_app(env_profile)

with app.app_context():
    try:
        db.create_all()
        print("✨ Database synchronization complete: Tables verified/created successfully.")
    except Exception as e:
        print(f"❌ Database initialization failed. Check connection parameters: {str(e)}")


def print_route_map(flask_app):
    print("📡 Registered routes:")
    for rule in sorted(flask_app.url_map.iter_rules(), key=lambda r: (str(r.rule), sorted(r.methods))):
        methods = ','.join(sorted(rule.methods - {'HEAD', 'OPTIONS'}))
        print(f"  {methods:15} {rule.rule}")

if __name__ == '__main__':
    is_debug = os.environ.get('FLASK_DEBUG', 'False').lower() in ['true', '1', 't']
    database_uri = app.config.get('SQLALCHEMY_DATABASE_URI')

    print(f"🚀 Starting MindBridge Backend Server on http://0.0.0.0:5000")
    print(f"🗄️  Using database: {database_uri}")
    print_route_map(app)
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=is_debug
    )