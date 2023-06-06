from api.models.index import db, Question
from flask import request, jsonify

def get_questions():
    questions = Question.query.all()
    all_questions = list(map(lambda question : question.serialize(), questions))
    return all_questions

def post_question(lawyer_id, user_id, text, user_name):
    new_question = Question(lawyer_id, user_id, text, user_name)
    db.session.add(new_question)
    db.session.commit()
    return new_question

def get_single_question(id):
    question = Question.query.get(id)
    return question