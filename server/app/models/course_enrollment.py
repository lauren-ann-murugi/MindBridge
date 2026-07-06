from app import db
from datetime import datetime
import uuid

class CourseEnrollment(db.Model):
    __tablename__ = 'course_enrollments'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    course_id = db.Column(db.String(36), db.ForeignKey('courses.id'), nullable=False)
    enrolled_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('course_enrollments', lazy='dynamic'))
    course = db.relationship('Course', back_populates='enrollments')
