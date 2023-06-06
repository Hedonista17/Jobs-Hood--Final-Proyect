from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.index import db, User, Lawyer
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, get_jwt
import api.domain.lawyer.controller as Controller
import api.handle_response as Response
import bcrypt
import api.domain.user.controller as userController
import json

lawyer_bp = Blueprint('lawyer_bp', __name__)

@lawyer_bp.route("/", methods= ["GET"])
def get_lawyers():
    return Controller.get_lawyers()

@lawyer_bp.route("/", methods= ["POST"])
def register_lawyer():
    data = request.get_json()

    new_lawyer = Controller.register_lawyer(data)

    if isinstance(new_lawyer, User):   
        return Response.response_ok(new_lawyer.serialize(), "Abogado registrado correctamente", 201)
   
    return new_lawyer

@lawyer_bp.route("/edit", methods=["PUT"])
@jwt_required()
def edit_user_lawyer():
    user_logged = get_jwt_identity()
    info = request.form.to_dict()
    avatar = request.files.get('avatar', None)  # Es el avatar que pasamos en el form.append en el handleClick 
    if avatar:  # Solo se actualiza el avatar si fue proporcionado
        user_update = userController.update_avatar(user_logged, avatar)
    user  =  Controller.edit_user_lawyer(user_logged["id"],json.loads(info['user']))
    if user:
       access_token = create_access_token(identity = user.serialize_only_user())
       return jsonify(access_token), 200
    else:
        return Response.response_error("Error al guardar los datos", 400) 