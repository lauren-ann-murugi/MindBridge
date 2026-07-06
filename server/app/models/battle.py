from app import db
from datetime import datetime
import uuid

class Battle(db.Model):
    __tablename__ = 'battles'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    creator_id = db.Column(db.String(36), db.ForeignKey('users.id'))
    winner_id = db.Column(db.String(36), db.ForeignKey('users.id'))
    status = db.Column(db.String(50), default='pending')
    started_at = db.Column(db.DateTime)
    ended_at = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    creator = db.relationship('User', foreign_keys=[creator_id], backref=db.backref('created_battles', lazy='dynamic'))
    winner = db.relationship('User', foreign_keys=[winner_id], backref=db.backref('won_battles', lazy='dynamic'))
    answers = db.relationship('BattleAnswer', back_populates='battle', lazy='dynamic', cascade='all, delete-orphan')
