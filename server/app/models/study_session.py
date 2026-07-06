from app import db
from datetime import datetime
import uuid

class StudySession(db.Model):
    __tablename__ = 'study_sessions'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    topic = db.Column(db.String(255))
    started_at = db.Column(db.DateTime, default=datetime.utcnow)
    ended_at = db.Column(db.DateTime)
    duration_seconds = db.Column(db.Integer, default=0)
    notes = db.Column(db.Text)

    user = db.relationship('User', backref=db.backref('study_sessions', lazy='dynamic'))
