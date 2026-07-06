from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Battle, BattleAnswer, User
from . import battles_bp

@battles_bp.route('/', methods=['GET'])
@jwt_required()
def get_battles():
    battles = Battle.query.order_by(Battle.created_at.desc()).all()
    return jsonify([{
        'id': battle.id,
        'name': battle.name,
        'description': battle.description,
        'status': battle.status,
        'creator_id': battle.creator_id,
    } for battle in battles]), 200

@battles_bp.route('/start', methods=['POST'])
@jwt_required()
def start_battle():
    data = request.get_json() or {}
    name = data.get('name')
    description = data.get('description')

    if not name:
        return jsonify({'error': 'Battle name is required'}), 400

    user_id = get_jwt_identity()
    battle = Battle(name=name, description=description, creator_id=user_id, status='active', started_at=db.func.now())
    db.session.add(battle)
    db.session.commit()

    return jsonify({'message': 'Battle started', 'battle_id': battle.id}), 201

@battles_bp.route('/<battle_id>/answer', methods=['POST'])
@jwt_required()
def submit_battle_answer(battle_id):
    data = request.get_json() or {}
    answer_text = data.get('answer')
    if not answer_text:
        return jsonify({'error': 'Answer is required'}), 400

    battle = Battle.query.get(battle_id)
    if not battle:
        return jsonify({'error': 'Battle not found'}), 404

    user_id = get_jwt_identity()
    correct = '42' in answer_text.lower() or 'true' in answer_text.lower()
    answer = BattleAnswer(battle_id=battle_id, user_id=user_id, answer=answer_text, correct=correct)
    db.session.add(answer)
    db.session.commit()

    if correct and battle.winner_id is None:
        battle.winner_id = user_id
        db.session.commit()

    return jsonify({'message': 'Answer submitted', 'correct': correct}), 201

@battles_bp.route('/leaderboard', methods=['GET'])
@jwt_required()
def get_battle_leaderboard():
    users = User.query.all()
    leaderboard = []
    for user in users:
        score = BattleAnswer.query.filter_by(user_id=user.id, correct=True).count()
        if score > 0:
            leaderboard.append({'user_id': user.id, 'full_name': user.full_name, 'score': score})

    leaderboard.sort(key=lambda x: x['score'], reverse=True)
    return jsonify({'leaderboard': leaderboard[:20]}), 200
