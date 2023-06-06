from api.models.db import db
from datetime import datetime


class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    lawyer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    lawyer = db.relationship('User', foreign_keys=[lawyer_id], back_populates='received_questions') #receptor
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', foreign_keys=[user_id], back_populates='written_questions')
    user_name = db.Column(db.String(80))
    question_comment = db.relationship("Question_comment", back_populates="question", uselist=False)
    text = db.Column(db.Text)
    data_create = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, lawyer_id, user_id, text, user_name):
        self.lawyer_id = lawyer_id
        self.user_id = user_id
        self.text = text
        self.user_name = user_name
        self.data_create = datetime.utcnow()

    def serialize(self):
        return {
            "id" : self.id,
            'lawyer_id': self.lawyer_id,
            'user_id': self.user_id,
            'text': self.text, 
            "user_name": self.user_name,
            "question_comment": self.question_comment.serialize() if self.question_comment else None,
            "data_create":self.data_create
        }
