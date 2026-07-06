from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Course, User, CourseEnrollment, Progress, Unit, Lesson
from . import courses_bp

@courses_bp.route('/', methods=['GET'])
def get_courses():
    courses = Course.query.all()
    return jsonify([{
        'id': c.id,
        'title': c.title,
        'description': c.description,
        'instructor_id': c.instructor_id,
    } for c in courses]), 200

@courses_bp.route('/<course_id>/enroll', methods=['POST'])
@jwt_required()
def enroll_course(course_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    course = Course.query.get(course_id)
    if not course:
        return jsonify({'error': 'Course not found'}), 404

    existing = CourseEnrollment.query.filter_by(user_id=user_id, course_id=course_id).first()
    if existing:
        return jsonify({'error': 'Already enrolled'}), 409

    enrollment = CourseEnrollment(user_id=user_id, course_id=course_id)
    db.session.add(enrollment)
    db.session.commit()

    return jsonify({'message': 'Enrolled successfully', 'course_id': course_id}), 201

@courses_bp.route('/<course_id>/progress', methods=['GET'])
@jwt_required()
def get_course_progress(course_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    course = Course.query.get(course_id)
    if not course:
        return jsonify({'error': 'Course not found'}), 404

    total_lessons = Lesson.query.join(Unit).filter(Unit.course_id == course_id).count()
    completed_lessons = Progress.query.join(Lesson).join(Unit).filter(
        Progress.user_id == user_id,
        Progress.completed == True,
        Unit.course_id == course_id
    ).count()

    progress = int((completed_lessons / total_lessons) * 100) if total_lessons else 0
    return jsonify({
        'course_id': course_id,
        'total_lessons': total_lessons,
        'completed_lessons': completed_lessons,
        'progress_percent': progress,
    }), 200
