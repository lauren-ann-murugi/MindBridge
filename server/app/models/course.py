# from app import db
# from datetime import datetime
# import uuid

# class Course(db.Model):
#     __tablename__ = 'courses'

#     id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
#     title = db.Column(db.String(255), nullable=False)
#     description = db.Column(db.Text)
#     instructor_id = db.Column(db.String(36), db.ForeignKey('users.id'))
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)
#     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

#     instructor = db.relationship('User', backref=db.backref('instructed_courses', lazy='dynamic'))
#     enrollments = db.relationship('CourseEnrollment', back_populates='course', lazy='dynamic', cascade='all, delete-orphan')
#     students = db.relationship('User', secondary='course_enrollments', back_populates='courses', lazy='dynamic')
#     units = db.relationship('Unit', backref='course', lazy='dynamic', cascade='all, delete-orphan')
#     resources = db.relationship('Resource', backref='course', lazy='dynamic', cascade='all, delete-orphan')
#     leaderboards = db.relationship('Leaderboard', backref='course', lazy='dynamic', cascade='all, delete-orphan')






from app import db
from datetime import datetime
import uuid

class Course(db.Model):
    __tablename__ = 'courses'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    instructor_id = db.Column(db.String(36), db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    instructor = db.relationship('User', backref=db.backref('instructed_courses', lazy='dynamic'))
    
    # Overlaps mitigation handles implicit course/user tracking configurations safely
    enrollments = db.relationship(
        'CourseEnrollment', 
        back_populates='course', 
        lazy='dynamic', 
        cascade='all, delete-orphan',
        overlaps="courses,students,user"
    )
    
    students = db.relationship(
        'User', 
        secondary='course_enrollments', 
        back_populates='courses', 
        lazy='dynamic',
        overlaps="course,enrollments,user"
    )
    
    units = db.relationship('Unit', backref='course', lazy='dynamic', cascade='all, delete-orphan')
    resources = db.relationship('Resource', backref='course', lazy='dynamic', cascade='all, delete-orphan')
    leaderboards = db.relationship('Leaderboard', backref='course', lazy='dynamic', cascade='all, delete-orphan')