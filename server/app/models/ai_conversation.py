from app import db
from datetime import datetime
import uuid

class AIConversation(db.Model):
    __tablename__ = 'ai_conversations'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    prompt = db.Column(db.Text)
    response = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('ai_conversations', lazy='dynamic'))
