from flask import Blueprint
from .services import login_service
authen = Blueprint("authen", __name__)


# login
@authen.route("/student-management/student/login", methods=['POST'])
def student_login():
    return login_service()


