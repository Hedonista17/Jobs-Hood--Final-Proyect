from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, get_jwt
from api.models.index import db, User, Company
import api.domain.company.controller as Controller
import api.handle_response as Response
import api.domain.user.controller as userController
import json

company_bp = Blueprint('company_bp', __name__)

@company_bp.route("/", methods= ["GET"])
def get_companies():
    return Controller.get_companies()

@company_bp.route("/", methods= ["POST"])
def register_company():
    data = request.get_json()

    new_company = Controller.register_company(data)

    if isinstance(new_company, User):   
        return Response.response_ok(new_company.serialize(), "Empresa creada correctamente", 201)
   
    return new_company

@company_bp.route("/edit", methods=["PUT"])
@jwt_required()
def edit_user_company():
    user_logged = get_jwt_identity()
    info = request.form.to_dict()
    avatar = request.files.get('avatar', None)  # Es el avatar que pasamos en el form.append en el handleClick 
    if avatar:  # Solo se actualiza el avatar si fue proporcionado
        user_update = userController.update_avatar(user_logged, avatar)
    user  =  Controller.edit_user_company(user_logged["id"],json.loads(info['user']))
    if user:
       access_token = create_access_token(identity = user.serialize_only_user())
       return jsonify(access_token), 200
    else:
        return Response.response_error("Error al guardar los datos", 400) 