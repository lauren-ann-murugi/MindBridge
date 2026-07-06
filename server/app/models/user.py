from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import uuid

class User(db.Model):
    __tablename__ = 'users'
        
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
        
    full_name = db.Column(db.String(120), nullable=False)
    institution = db.Column(db.String(255))
    major = db.Column(db.String(255))
    academic_level = db.Column(db.String(50))
        
    xp = db.Column(db.Integer, default=0)
    streak = db.Column(db.Integer, default=0)
    level = db.Column(db.Integer, default=1)
        
    role = db.Column(db.String(20), default='student')
    is_active = db.Column(db.Boolean, default=True)
    is_verified = db.Column(db.Boolean, default=False)
        
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login = db.Column(db.DateTime)
    courses = db.relationship('Course', secondary='course_enrollments', back_populates='students', lazy='dynamic')
    team_rooms = db.relationship('TeamRoom', secondary='team_room_memberships', back_populates='members', lazy='dynamic')
        
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
        
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'full_name': self.full_name,
            'institution': self.institution,
            'major': self.major,
            'academic_level': self.academic_level,
            'xp': self.xp,
            'streak': self.streak,
            'level': self.level,
            'role': self.role,
            'is_active': self.is_active,
            'is_verified': self.is_verified,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'last_login': self.last_login.isoformat() if self.last_login else None,
        }