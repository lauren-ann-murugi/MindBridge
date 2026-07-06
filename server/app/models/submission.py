from app import db
from datetime import datetime
import uuid

class Submission(db.Model):
    __tablename__ = 'submissions'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    assignment_id = db.Column(db.String(36), db.ForeignKey('assignments.id'), nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.Text)
    score = db.Column(db.Float)
    status = db.Column(db.String(50), default='submitted')
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)
    graded_at = db.Column(db.DateTime)

    student = db.relationship('User', backref=db.backref('submissions', lazy='dynamic'))
