# from app import db
# from datetime import datetime
# import uuid

# class TeamRoom(db.Model):
#     __tablename__ = 'team_rooms'

#     id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
#     name = db.Column(db.String(255), nullable=False)
#     description = db.Column(db.Text)
#     owner_id = db.Column(db.String(36), db.ForeignKey('users.id'))
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)

#     owner = db.relationship('User', backref=db.backref('owned_team_rooms', lazy='dynamic'))
#     memberships = db.relationship('TeamRoomMembership', back_populates='team_room', lazy='dynamic', cascade='all, delete-orphan')
#     members = db.relationship('User', secondary='team_room_memberships', back_populates='team_rooms', lazy='dynamic')
#     messages = db.relationship('Message', backref='team_room', lazy='dynamic', cascade='all, delete-orphan')




from app import db
from datetime import datetime
import uuid

class TeamRoom(db.Model):
    __tablename__ = 'team_rooms'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    owner_id = db.Column(db.String(36), db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    owner = db.relationship('User', backref=db.backref('owned_team_rooms', lazy='dynamic'))
    
    memberships = db.relationship(
        'TeamRoomMembership', 
        back_populates='team_room', 
        lazy='dynamic', 
        cascade='all, delete-orphan',
        overlaps="members,team_rooms,user"
    )
    
    members = db.relationship(
        'User', 
        secondary='team_room_memberships', 
        back_populates='team_rooms', 
        lazy='dynamic',
        overlaps="memberships,team_room,user"
    )
    
    messages = db.relationship('Message', backref='team_room', lazy='dynamic', cascade='all, delete-orphan')