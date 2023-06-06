from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.index import db, Question, User
import api.domain.question.controller as Controller
from api.domain.user.controller import get_user_private
import api.handle_response as Response
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, get_jwt


question_bp = Blueprint('api/question', __name__)

@question_bp.route('/', methods = ['GET'])
def get_questions():
    return Controller.get_questions()


@question_bp.route('/', methods = ['POST'])
@jwt_required()
def post_question():
    data = request.get_json()
    info_token = get_jwt()
    user = info_token['sub']
    user_logged = get_user_private(user)
    if isinstance(user_logged, User):
        new_question = Controller.post_question(user_logged.serialize(), data)
        if isinstance(new_question, Question):
            return Response.response_ok(new_question.serialize(), "Pregunta creada", 201)
    return new_question


@question_bp.route('/<int:id>', methods = ['GET'])
def get_single_question(id):
    return Controller.get_single_question(id)
