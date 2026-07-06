from app import db
from datetime import datetime
import uuid

class QuizQuestion(db.Model):
    __tablename__ = 'quiz_questions'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    quiz_id = db.Column(db.String(36), db.ForeignKey('quizzes.id'), nullable=False)
    question = db.Column(db.Text, nullable=False)
    answer = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    quiz = db.relationship('Quiz', back_populates='questions')
