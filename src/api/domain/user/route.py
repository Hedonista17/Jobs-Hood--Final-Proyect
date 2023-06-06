from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.index import db, User, Roles
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, get_jwt
import api.domain.user.controller as Controller
import api.handle_response as Response
import json

api = Blueprint('api/user', __name__)


@api.route("/", methods= ["GET"])
def get_users():
    return Controller.get_users()

@api.route('/worker', methods=['POST'])
def create_user():
        body = request.get_json()
        new_user = Controller.create_user(body)   
        if isinstance(new_user, User):   
            return Response.response_ok(new_user.serialize(), "Usuario registrado correctamente", 201)
        return new_user #para que recoja el error de la funcion validar_usuario

@api.route('/login', methods=['POST'])
def login_users():
    body = request.get_json()
    return Controller.login_users(body)

    

@api.route('/profile', methods =['GET'])
@jwt_required()
def get_user_private():
    info_token = get_jwt()
    user = info_token['sub']
    user_response = Controller.get_user_private(user)
    if isinstance(user_response, User):   # si el nuevo usuario es una instancia del model USER (pertenece?) responde un serializado si no ,responde el mensaje de erro
        return jsonify(user_response.serialize()), 200
    return jsonify(user_response), user_response['status']

@api.route("/<int:id>", methods= ["GET"])
def get_single_user(id):
    if not isinstance(id, int):
        return Response.response_error("Not valid", 404) 
    user = Controller.get_single_user(id)
    return Response.response_ok(user.serialize(), "tu usuario, gracias", 200)



@api.route('/update_avatar', methods=['PUT'])
@jwt_required()
def update_avatar():
    try:
        user = get_jwt_identity()
        avatar = request.files['avatar'] # Es el avatar que pasamos en el form.append en el handleClick 
        user_update = Controller.update_avatar(user, avatar)
        return Response.response_ok(user_update.serialize(), "Avatar actualizado", 200)
        
    except Exception as error:
        return Response.response_error("Error al actualizar el avatar", 400)


@api.route("/edit", methods=["PUT"])
@jwt_required()
def edit_user():
    user_logged = get_jwt_identity()
    info = request.form.to_dict()
    avatar = request.files.get('avatar', None)  # Es el avatar que pasamos en el form.append en el handleClick 
    if avatar:  # Solo se actualiza el avatar si fue proporcionado
        user_update = Controller.update_avatar(user_logged, avatar)
    user = Controller.edit_user(user_logged["id"],json.loads(info['user']))
    if user:
        access_token = create_access_token(identity = user.serialize_only_user())
        return jsonify(access_token), 200
    else:
        return Response.response_error("Error al guardar los datos", 400) 



@api.route("/check/<string:mode>", methods= ["POST"])
def check(mode):
    data = request.get_json()
    if data.get('col_number') is not None:
        result = Controller.check_lawyer(data, mode)
    elif data.get('cif') is not None:
        result = Controller.check_company(data, mode)
    else:
        result = Controller.check_worker(data, mode)
    return result


@api.route('/change_password', methods=['PUT'])
@jwt_required()
def change_password():
    user_logged = get_jwt_identity()
    body = request.get_json()
    result = Controller.change_password(user_logged["id"], body)
    if result: 
        return Response.response_ok(result.serialize_only_user(), "contraseña cambiada", 200)
    else:
        return Response.response_error("Contraseña incorrecta", 400)