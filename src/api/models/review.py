from api.models.db import db
from datetime import datetime


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    receiver = db.relationship('User', foreign_keys=[receiver_id], back_populates='received_reviews') #receptor
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    author = db.relationship('User', foreign_keys=[author_id], back_populates='written_reviews') #autor
    rating = db.Column(db.Integer(), nullable=False)
    text = db.Column(db.Text)
    user_name = db.Column(db.String(80))
    data_create = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, receiver_id, author_id, rating, text, user_name):
        self.receiver_id = receiver_id
        self.author_id = author_id
        self.rating = rating
        self.text = text
        self.user_name = user_name


    def serialize(self):
        return {
            "id" : self.id,
            "receiver": self.receiver.serialize_only_user(),
            'receiver_id': self.receiver_id,
            'author_id': self.author_id,
            'rating': self.rating,
            'text': self.text,
            "user_name" : self.user_name,
            "data_create":self.data_create
        }

