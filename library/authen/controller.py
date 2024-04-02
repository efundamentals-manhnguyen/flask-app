from flask import Blueprint
from .services import login_service, forgot_password_service
authen = Blueprint("authen", __name__)


# login
@authen.route("/student-management/student/login", methods=['POST'])
def student_login():
    return login_service()


# forgot password
@authen.route("/student-management/student/forgot-password/<string:email>", methods=['POST'])
def forgot_password(email):
    return forgot_password_service(email)
