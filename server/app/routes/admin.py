from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import User, Course, StudySession, CourseEnrollment
from . import admin_bp


def _require_admin(user_id):
    user = User.query.get(user_id)
    if not user:
        return None, jsonify({'error': 'User not found'}), 404
    if user.role != 'admin':
        return None, jsonify({'error': 'Admin privileges required'}), 403
    return user, None, None


@admin_bp.route('/dashboard', methods=['GET'])
@jwt_required()
def admin_dashboard():
    user_id = get_jwt_identity()
    _, error_response, status = _require_admin(user_id)
    if error_response:
        return error_response, status

    total_users = User.query.count()
    total_courses = Course.query.count()
    total_enrollments = CourseEnrollment.query.count()
    total_sessions = StudySession.query.count()

    return jsonify({
        'users': total_users,
        'courses': total_courses,
        'enrollments': total_enrollments,
        'study_sessions': total_sessions,
    }), 200


@admin_bp.route('/users', methods=['GET'])
@jwt_required()
def list_users():
    user_id = get_jwt_identity()
    _, error_response, status = _require_admin(user_id)
    if error_response:
        return error_response, status

    users = User.query.all()
    return jsonify([{
        'id': u.id,
        'email': u.email,
        'full_name': u.full_name,
        'role': u.role,
        'is_active': u.is_active,
    } for u in users]), 200


@admin_bp.route('/session', methods=['POST'])
@jwt_required()
def create_session():
    user_id = get_jwt_identity()
    _, error_response, status = _require_admin(user_id)
    if error_response:
        return error_response, status

    data = request.get_json() or {}
    target_user_id = data.get('user_id')
    topic = data.get('topic')

    if not target_user_id or not topic:
        return jsonify({'error': 'user_id and topic are required'}), 400

    target_user = User.query.get(target_user_id)
    if not target_user:
        return jsonify({'error': 'Target user not found'}), 404

    session = StudySession(user_id=target_user_id, topic=topic)
    db.session.add(session)
    db.session.commit()

    return jsonify({
        'message': 'Session created',
        'session': {
            'id': session.id,
            'user_id': session.user_id,
            'topic': session.topic,
            'started_at': session.started_at.isoformat(),
        }
    }), 201
