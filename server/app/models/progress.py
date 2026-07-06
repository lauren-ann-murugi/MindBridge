from app import db
from datetime import datetime
import uuid

class Progress(db.Model):
    __tablename__ = 'progress'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    lesson_id = db.Column(db.String(36), db.ForeignKey('lessons.id'), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    completion_percentage = db.Column(db.Float, default=0.0)
    completed_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('progress_records', lazy='dynamic'))
