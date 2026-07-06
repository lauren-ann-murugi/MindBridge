from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import TeamRoom, TeamRoomMembership, Message, User
from . import team_rooms_bp

@team_rooms_bp.route('/', methods=['GET'])
@jwt_required()
def list_team_rooms():
    rooms = TeamRoom.query.all()
    return jsonify([{
        'id': room.id,
        'name': room.name,
        'description': room.description,
        'owner_id': room.owner_id,
        'member_count': room.memberships.count(),
    } for room in rooms]), 200

@team_rooms_bp.route('/', methods=['POST'])
@jwt_required()
def create_team_room():
    data = request.get_json() or {}
    name = data.get('name')
    description = data.get('description')

    if not name:
        return jsonify({'error': 'Room name is required'}), 400

    user_id = get_jwt_identity()
    room = TeamRoom(name=name, description=description, owner_id=user_id)
    db.session.add(room)
    db.session.commit()

    membership = TeamRoomMembership(team_room_id=room.id, user_id=user_id)
    db.session.add(membership)
    db.session.commit()

    return jsonify({'message': 'Team room created', 'room_id': room.id}), 201

@team_rooms_bp.route('/<room_id>/join', methods=['POST'])
@jwt_required()
def join_team_room(room_id):
    user_id = get_jwt_identity()
    room = TeamRoom.query.get(room_id)
    if not room:
        return jsonify({'error': 'Team room not found'}), 404

    if TeamRoomMembership.query.filter_by(team_room_id=room_id, user_id=user_id).first():
        return jsonify({'error': 'Already joined'}), 409

    membership = TeamRoomMembership(team_room_id=room_id, user_id=user_id)
    db.session.add(membership)
    db.session.commit()

    return jsonify({'message': 'Joined team room successfully'}), 200

@team_rooms_bp.route('/<room_id>/messages', methods=['GET'])
@jwt_required()
def get_team_room_messages(room_id):
    user_id = get_jwt_identity()
    membership = TeamRoomMembership.query.filter_by(team_room_id=room_id, user_id=user_id).first()
    if not membership:
        return jsonify({'error': 'You must join the room to view messages'}), 403

    messages = Message.query.filter_by(team_room_id=room_id).order_by(Message.created_at.asc()).all()
    return jsonify([{
        'id': m.id,
        'user_id': m.user_id,
        'content': m.content,
        'created_at': m.created_at.isoformat() if m.created_at else None,
    } for m in messages]), 200

@team_rooms_bp.route('/<room_id>/messages', methods=['POST'])
@jwt_required()
def send_team_room_message(room_id):
    user_id = get_jwt_identity()
    membership = TeamRoomMembership.query.filter_by(team_room_id=room_id, user_id=user_id).first()
    if not membership:
        return jsonify({'error': 'You must join the room to send messages'}), 403

    data = request.get_json() or {}
    content = data.get('content')
    if not content:
        return jsonify({'error': 'Message content is required'}), 400

    message = Message(team_room_id=room_id, user_id=user_id, content=content)
    db.session.add(message)
    db.session.commit()

    return jsonify({'message': 'Message sent', 'message_id': message.id}), 201
