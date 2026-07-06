from app import db
from datetime import datetime
import uuid

class Quiz(db.Model):
    __tablename__ = 'quizzes'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    lesson_id = db.Column(db.String(36), db.ForeignKey('lessons.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    total_points = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    questions = db.relationship('QuizQuestion', back_populates='quiz', lazy='dynamic', cascade='all, delete-orphan')
