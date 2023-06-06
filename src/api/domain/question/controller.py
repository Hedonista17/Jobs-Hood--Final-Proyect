import api.domain.question.repository as Repository
from api.domain.user.repository import get_single_user
import api.handle_response as Response

def get_questions():
    resultado = Repository.get_questions()
    return Response.response_ok(resultado, "Get all questions", 201)

def post_question(user, data):
    if user['role'] == "User":
        lawyer = get_single_user(data['lawyer_id'])
        lawyer_serialized = lawyer.serialize()
        if lawyer_serialized['role'] == "Lawyer":
            return Repository.post_question(data['lawyer_id'], data['user_id'], data['text'], user['user_name'])
        return Response.response_error("No se puede hacer preguntas a este tipo de usuario", 400)
    return Response.response_error("Usuario no es de tipo user", 404)

def get_single_question(id):
    resultado = Repository.get_single_question(id)
    if resultado is not None:
        return Response.response_ok(resultado.serialize(), "La pregunta", 200)
    return Response.response_error("No existe", 404)