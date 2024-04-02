import os
import jwt
import smtplib
import ssl

from flask import jsonify
from flask import request

from sqlalchemy.sql import func
from datetime import datetime, timedelta

from ..students.services import hash_password

from library.library_ma import StudentSchema
from library.model import Students
student_schema = StudentSchema()
students_schema = StudentSchema(many=True)

SECRET_KEY = os.environ.get("KEY")
SECURITY_ALGORITHM = 'HS256'

def generate_token(student_id):
    expire = datetime.now() + timedelta(
        seconds = 60 * 60 * 24 * 3 # Expired after 3 days
    )
    to_encode = {
        "exp": expire, "student_id": student_id
    }
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=SECURITY_ALGORITHM)

    return encoded_jwt


def login_service():
    data = request.json
    if (data and("email" in data) and ("password" in data)):
        email = data['email']
        password = hash_password(data['password'])
        student = students_schema.dump(Students.query.filter_by(email = email, password = password))
        if(student):   
            token =  generate_token(student[0]['id']) 
            return jsonify({'x-access-token': token, 'x-user-name': student[0]['name']}), 200
        else:
            return jsonify({"message": "Login failed"}), 401
    else:
        return jsonify({"message": "Please fill login form!!!"}), 404
    

def forgot_password_service(email):
    student = Students.query.filter(func.lower(Students.email) == email.lower()).first()
    if student:
        student_json = student_schema.dump(student)
        reset_password_token = generate_token(student_json["id"])

        # port = 465  # For SSL
        # smtp_server = "smtp.gmail.com"
        # sender_email = "electrolibrary2024@gmail.com"  # Enter your address
        # receiver_email = "tommybeer2111@gmail.com"  # Enter receiver address
        # password = "Electro@123"
        # message = """\
        # Subject: Hi there

        # This message is sent from Python."""

        # context = ssl.create_default_context()
        # with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        #     server.login(sender_email, password)
        # server.sendmail(sender_email, receiver_email, message)
        return reset_password_token
    else:
        return jsonify({"message": "Student not found"}), 404
    
    