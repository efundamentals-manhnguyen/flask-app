from library.library_ma import StudentSchema
from library.model import Students
from flask import request, jsonify
import jwt, os
from functools import wraps
student_schema = StudentSchema()
students_schema = StudentSchema(many=True)

SECRET_KEY = os.environ.get("KEY")
SECURITY_ALGORITHM = 'HS256'


#decorator for verifying the JWT
def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message' : 'Token is missing !!'}), 401
        
        try:
            data = jwt.decode(token, SECRET_KEY, SECURITY_ALGORITHM)
            current_user = student_schema.jsonify(Students.query.get(data['student_id']))
            if current_user is None:
                return {
                "message": "Invalid Authentication token!",
                "error": "Unauthorized"
            }, 403
        except Exception as e:
            return {
                "message": "Something went wrong",
                "error": str(e)
            }, 500
        return  func(*args, **kwargs)
    return decorated