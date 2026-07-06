from app import db
from datetime import datetime
import uuid

class BattleAnswer(db.Model):
    __tablename__ = 'battle_answers'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    battle_id = db.Column(db.String(36), db.ForeignKey('battles.id'), nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    answer = db.Column(db.Text)
    correct = db.Column(db.Boolean, default=False)
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('battle_answers', lazy='dynamic'))
    battle = db.relationship('Battle', back_populates='answers')
