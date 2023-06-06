from api.models.index import db, User, Company, Roles
from api.domain.user.controller import create_user_by_role
from api.domain.user.repository import edit_user_by_role
from flask import request, jsonify
import bcrypt
from api.functions import hash_pass, find_role
import api.handle_response as Response


def get_companies():
    all_companies = Company.query.all()
    users = User.query.filter(User.roles.has(description='Company')).all()
    companies_serialized = list(map(lambda empresa : empresa.serialize(), all_companies))
    users_serialized = list(map(lambda user: user.serialize(), users))
    return users_serialized

def get_company_by_user_id(user_id):
    return Company.query.filter_by(user_id = user_id).first()

def register_company(data, address, province, cif):

    roles = find_role('Company', Roles)

    user = create_user_by_role(data, roles.id)

    new_company = Company(address, province, cif)
        
    user.company = new_company

    db.session.add(user)
    db.session.commit()

    return user

def edit_user_company(info, company):
   
    company.address = info['address']
    company.province = info['province']

    db.session.commit()

    return company

