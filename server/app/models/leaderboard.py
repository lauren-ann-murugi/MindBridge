from app import db
from datetime import datetime
import uuid

class Leaderboard(db.Model):
    __tablename__ = 'leaderboards'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    course_id = db.Column(db.String(36), db.ForeignKey('courses.id'), nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    score = db.Column(db.Integer, default=0)
    rank = db.Column(db.Integer, default=0)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('leaderboard_entries', lazy='dynamic'))
