from flask import Blueprint
from .services import login_service, token_required
authen = Blueprint("authen", __name__)


# login
@authen.route("/student-management/student/login", methods=['POST'])
def student_login():
    return login_service()

#authen
@authen.route("/student-management/student/auth")
@token_required
def auth():
    return "JWT is valid. Welcome to electro!!!"

