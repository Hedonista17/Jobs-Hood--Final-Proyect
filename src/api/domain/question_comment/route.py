from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.index import db, Question_comment, User
import api.domain.question_comment.controller as Controller
from api.domain.user.controller import get_user_private
import api.handle_response as Response
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, get_jwt


question_comment_bp = Blueprint('api/question/comment', __name__)

@question_comment_bp.route('/<int:id>', methods = ['GET'])
def get_single_comment(id):
    return Controller.get_single_comment(id)

@question_comment_bp.route('/<int:question_id>', methods=['POST'])
@jwt_required()
def post_question_comment(question_id):
    data = request.get_json()
    info_token = get_jwt()
    user = info_token['sub']
    user_logged = get_user_private(user)
    if isinstance(user_logged, User):
        new_comment = Controller.post_question_comment(user_logged.serialize(), question_id, data)
        if isinstance(new_comment, Question_comment):
            return Response.response_ok(new_comment.serialize(), "Comentario creado", 201)
        else:
            return new_comment
    return Response.response_error("Usuario no autorizado", 404)                                        

@question_comment_bp.route('/lawyer/<int:lawyer_id>', methods = ['GET'])
def get_comments_by_lawyer(lawyer_id):
    return Controller.get_comments(lawyer_id)
