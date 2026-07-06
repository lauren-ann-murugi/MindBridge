from app import db
from datetime import datetime
import uuid

class Lesson(db.Model):
    __tablename__ = 'lessons'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    unit_id = db.Column(db.String(36), db.ForeignKey('units.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text)
    duration_minutes = db.Column(db.Integer, default=0)
    sort_order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    assignments = db.relationship('Assignment', backref='lesson', lazy='dynamic', cascade='all, delete-orphan')
    quizzes = db.relationship('Quiz', backref='lesson', lazy='dynamic', cascade='all, delete-orphan')
    progress_records = db.relationship('Progress', backref='lesson', lazy='dynamic', cascade='all, delete-orphan')
