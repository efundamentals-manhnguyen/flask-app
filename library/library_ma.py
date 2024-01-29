from .extension import ma


class StudentSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'email', 'password', 'dob', 'gender', 'class_name')


class CatSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name')


class AuthorSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name')


class BorrowSchema(ma.Schema):
    class Meta:
        fields = ('id', 'book_id', 'student_id', 'borrow_date', 'return_date')


class BookSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'image_url', 'description', 'author_id', 'category_id')