# from app import db
# from datetime import datetime
# import uuid

# class TeamRoomMembership(db.Model):
#     __tablename__ = 'team_room_memberships'

#     id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
#     team_room_id = db.Column(db.String(36), db.ForeignKey('team_rooms.id'), nullable=False)
#     user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
#     joined_at = db.Column(db.DateTime, default=datetime.utcnow)

#     user = db.relationship('User', backref=db.backref('team_room_memberships', lazy='dynamic'))
#     team_room = db.relationship('TeamRoom', back_populates='memberships')






from app import db
from datetime import datetime
import uuid

class TeamRoomMembership(db.Model):
    __tablename__ = 'team_room_memberships'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    team_room_id = db.Column(db.String(36), db.ForeignKey('team_rooms.id'), nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    joined_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship(
        'User', 
        backref=db.backref('team_room_memberships', lazy='dynamic'),
        overlaps="members,memberships,team_rooms"
    )
    
    team_room = db.relationship(
        'TeamRoom', 
        back_populates='memberships',
        overlaps="members,memberships,team_rooms"
    )