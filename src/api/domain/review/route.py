from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.index import db, Review, User
import api.domain.review.controller as Controller
from api.domain.user.controller import get_user_private
import api.handle_response as Response
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, get_jwt



review_bp = Blueprint('api/review', __name__)

@review_bp.route("/", methods =["GET"])
def get_reviews():
    return Controller.get_reviews()

@review_bp.route("/", methods =["POST"])
@jwt_required() #la función de autorizacion del token
def post_review():
    data = request.get_json() #traemos el body de la request
    info_token = get_jwt()  #obtenemos el token con get_jwt que viene de flask_jwt_extended
    user = info_token['sub'] #del token recibido obtenemos la parte del usuario
    user_logged = get_user_private(user) #llamamos a la función get_user_private que devuelve un usuario en json (esa funcion está en repository de user)
    if isinstance(user_logged, User): #si el usuario es de la clase User
        new_review = Controller.post_review(user_logged.serialize(), data) #llamamos a controller pasándole el usuario serializado y la data para luego preguntarle si es de tipo "user"
        if isinstance(new_review, Review): #si lo que devuelve controller es instancia de tipo review es que todo ha ido bien
            return Response.response_ok(new_review.serialize(), "Review creada", 201) #retornamos el json de la review 
    return new_review #para traer los mensajes de controller

