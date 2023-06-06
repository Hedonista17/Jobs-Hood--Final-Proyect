"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models.index import db
import api.domain.user.route as api_user
from api.routes import api
from api.domain.company.route import company_bp
from api.domain.lawyer.route import lawyer_bp
from api.domain.review.route import review_bp
from api.domain.question.route import question_bp
from api.domain.question_comment.route import question_comment_bp
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import  get_jwt_identity, jwt_required, JWTManager
import cloudinary
from datetime import timedelta



app = Flask(__name__)
app.url_map.strict_slashes = False
app.config["JWT_SECRET_KEY"] = os.environ["JWT_SECRET_KEY"]  # Change this!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

ENV = os.getenv("FLASK_ENV")
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')

#Cloudinary

app.config['CLOUD_NAME'] = os.environ.get('CLOUD_NAME')
app.config['CLOUD_API_KEY'] = os.environ.get('CLOUD_API_KEY')
app.config['CLOUD_API_SECRET'] = os.environ.get('CLOUD_API_SECRET')

cloudinary.config(
    cloud_name = app.config['CLOUD_NAME'],
    api_key = app.config['CLOUD_API_KEY'],
    api_secret = app.config['CLOUD_API_SECRET'],
    secure = True
)


# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix

app.register_blueprint(api_user.api, url_prefix='/api/user')
app.register_blueprint(company_bp, url_prefix='/api/company')
app.register_blueprint(lawyer_bp, url_prefix='/api/lawyer')
app.register_blueprint(review_bp, url_prefix='/api/review')
app.register_blueprint(question_bp, url_prefix='/api/question')
app.register_blueprint(question_comment_bp, url_prefix='/api/question/comment')






# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
