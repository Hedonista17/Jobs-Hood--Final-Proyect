import api.domain.question_comment.repository as Repository
from api.domain.question.repository import get_single_question
import api.handle_response as Response

def get_single_comment(id):
    resultado = Repository.get_single_comment(id)
    if resultado is not None:
        return Response.response_ok(resultado.serialize(), "La pregunta", 200)
    return Response.response_error("No existe", 404)

def post_question_comment(user, question_id, data):
    question = get_single_question(question_id)
    if question and question.lawyer_id == user['id']:
        return Repository.post_question_comment(user['id'], question_id, data['text'], user['name'])
    return Response.response_error("Pregunta no encontrada o el usuario no tiene permiso para responder", 404)


def get_comments(lawyer_id):
    resultado = Repository.get_comments(lawyer_id)
    return Response.response_ok(resultado, "Get all comments for lawyer_id: {}".format(lawyer_id), 200)
