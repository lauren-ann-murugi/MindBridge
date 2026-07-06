from app import db
from datetime import datetime
import uuid

class Resource(db.Model):
    __tablename__ = 'resources'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    course_id = db.Column(db.String(36), db.ForeignKey('courses.id'))
    lesson_id = db.Column(db.String(36), db.ForeignKey('lessons.id'))
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    resource_type = db.Column(db.String(50), default='link')
    url = db.Column(db.String(1024))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    lesson = db.relationship('Lesson', backref=db.backref('resources', lazy='dynamic'))
