from flask import request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app import db
from app.models import User
from datetime import datetime
from . import auth_bp  # Direct relative import from localized package container

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
                
        if not all(k in data for k in ['email', 'password', 'full_name']):
            return jsonify({'error': 'Missing required fields'}), 400
                
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already registered'}), 409
                
        user = User(
            email=data['email'],
            full_name=data['full_name'],
            institution=data.get('institution'),
            major=data.get('major'),  # Aligned with Next.js payload mapping definition
            academic_level=data.get('academic_level'),
            role='student'
        )
        user.set_password(data['password'])
                
        db.session.add(user)
        db.session.commit()
                
        # Optional: Generate automated access token right at user birth event
        access_token = create_access_token(identity=str(user.id))
                
        return jsonify({
            'message': 'Registration successful',
            'access_token': access_token,
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
                
        if not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password required'}), 400
                
        user = User.query.filter_by(email=data['email']).first()
        if not user or not user.check_password(data['password']):
            return jsonify({'error': 'Invalid credentials'}), 401
                
        if not user.is_active:
            return jsonify({'error': 'Account is inactive'}), 403
                
        user.last_login = datetime.utcnow()
        db.session.commit()
                
        access_token = create_access_token(identity=str(user.id))
                
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
                
        if not user:
            return jsonify({'error': 'User not found'}), 404
                
        return jsonify(user.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    return jsonify({'message': 'Logout successful'}), 200

@auth_bp.route('/change-password', methods=['PUT'])
@jwt_required()
def change_password():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404

        data = request.get_json() or {}
        current_password = data.get('current_password')
        new_password = data.get('new_password')

        if not current_password or not new_password:
            return jsonify({'error': 'Both current_password and new_password are required'}), 400

        if not user.check_password(current_password):
            return jsonify({'error': 'Current password is incorrect'}), 403

        user.set_password(new_password)
        db.session.commit()

        return jsonify({'message': 'Password changed successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500