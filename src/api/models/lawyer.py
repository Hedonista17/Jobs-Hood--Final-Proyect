from api.models.db import db
from datetime import datetime


class Lawyer(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', back_populates='lawyer')
    address = db.Column(db.String(100), nullable=False)
    province = db.Column(db.String(100), nullable=False)
    col_number = db.Column(db.Integer(), unique=True, nullable=False)
    favs = db.relationship("Favorites", back_populates= "lawyer")
    data_create = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, address,province, col_number): 
        self.address = address
        self.province = province
        self.col_number = col_number
    
    def serialize(self):
        return{
        "id" : self.id,
        "address": self.address,
        "province" : self.province,
        "col_number": self.col_number
        }