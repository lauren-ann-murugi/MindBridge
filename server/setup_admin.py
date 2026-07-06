from app import create_app, db
from app.models import User

# This initializes your app context so the script can talk to your database
app = create_app()

with app.app_context():
    # Provisioning logic
    user = User.query.filter_by(email="adminlauren@gmail.com").first()
    
    if not user:
        print("Creating new admin user...")
        user = User(
            email="adminlauren@gmail.com",
            full_name="Lauren Admin",
            role="admin",
            is_active=True
        )
    else:
        print("Admin user found, updating role...")
        user.role = "admin"
        
    user.set_password("forgetadminlauren2026")
    db.session.add(user)
    db.session.commit()
    print("✅ Admin account successfully provisioned.")