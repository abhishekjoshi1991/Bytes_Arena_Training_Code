from flask_wtf import FlaskForm
from wtforms import StringField, EmailField, PasswordField, SubmitField, BooleanField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError
from flaskdemo.models import User
from flask_login import current_user
from flask_wtf.file import FileField, FileAllowed

# Registration form for blog
class RegistrationForm(FlaskForm):
    username = StringField(label='Username', validators=[DataRequired(), Length(min=2, max=16)])
    email = StringField(label='Email', validators=[DataRequired(), Email()])
    password = PasswordField(label='Password', validators=[DataRequired()])
    confirm_password = PasswordField(label='Confirm Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField(label='Sign Up')

    # common syntax for field validation
    # def validate_fieldtobevalidated(self, fieldtobevalidated):
    #     if some_condition_is_true:
    #         raise ValidationError('Validation Error Message')

    # validation for unique username
    def validate_username(self,username):
        user_exists = User.query.filter_by(username=username.data).first()
        if user_exists:
            raise ValidationError('Username Already Taken! Try with different one')

    # validation for unique email
    def validate_email(self,email):
        email_exists = User.query.filter_by(email=email.data).first()
        if email_exists:
            raise ValidationError('Email Already Taken! Try with different one')

# Login Form
class LoginForm(FlaskForm):
    email = EmailField(label='Email', validators=[DataRequired(), Email()])
    password = PasswordField(label='Password', validators=[DataRequired()])
    remember = BooleanField(label='Remember Me')
    submit = SubmitField(label='Log In')

# Account Info Update form for blog
class AccountInfoUpdate(FlaskForm):
    username = StringField(label='Username', validators=[DataRequired(), Length(min=2, max=16)])
    email = StringField(label='Email', validators=[DataRequired(), Email()])
    picture = FileField(label='Update Picture', validators=[FileAllowed(['jpg','png'])])
    submit = SubmitField(label='Update')

    # validation for unique username
    def validate_username(self,username):
        if username.data != current_user.username: # this condition is for when we update email only it will throw validation message without this
            user_exists = User.query.filter_by(username=username.data).first()
            if user_exists:
                raise ValidationError('Username Already Taken! Try with different one')

    # validation for unique email
    def validate_email(self,email):
        if email.data != current_user.email:
            email_exists = User.query.filter_by(email=email.data).first()
            if email_exists:
                raise ValidationError('Email Already Taken! Try with different one')


class RequestResetForm(FlaskForm):
    email = StringField(label='Email', validators=[DataRequired(), Email()])
    submit = SubmitField(label='Request Password Reset')

    # validation for unique email
    def validate_email(self, email):
        email_exists = User.query.filter_by(email=email.data).first()
        if not email_exists:
            raise ValidationError('There is no account with that email! Please register first.')


class ResetPasswordForm(FlaskForm):
    password = PasswordField(label='Password', validators=[DataRequired()])
    confirm_password = PasswordField(label='Confirm Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField(label='Reset Password')