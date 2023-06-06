from api.models.db import db
from datetime import datetime


class Question_comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_question = db.Column(db.Integer, db.ForeignKey("question.id"))
    question = db.relationship("Question", back_populates="question_comment")
    lawyer_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    lawyer = db.relationship('User', foreign_keys=[lawyer_id], back_populates='written_answers')
    text = db.Column(db.Text)
    name = db.Column(db.String(80))
    data_create = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, id_question, lawyer_id, text, name):
        self.id_question = id_question
        self.lawyer_id = lawyer_id
        self.text = text
        self.name = name
        self.data_create = datetime.utcnow()

    def serialize(self):
        return {
            "id" : self.id,
            "id_question" : self.id_question,
            "lawyer_id": self.lawyer_id,
            "text" : self.text,
            "name" : self.name,
            "data_create": self.data_create
            } 