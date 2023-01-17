from datetime import datetime
from itsdangerous.url_safe import URLSafeTimedSerializer as Serializer
from flask import current_app
from flaskdemo import db, login_manager
from flask_login import UserMixin  # This provides default implementations for the methods that Flask-Login expects user objects to have. Useful in active or anonymus user

'''need to provide a user_loader callback.
 This callback is used to reload the user object from the user ID stored in the session.'''
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(16), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False, default='default.jpg') # we will hash image to 20 character long
    password = db.Column(db.String(50), nullable=False) # we will hash password to 50 character long
    posts = db.relationship('Post', backref='author')

    # to create token for password reset
    def generate_refresh_token(self):
        s = Serializer(current_app.config['SECRET_KEY'])
        return s.dumps({'user_id': self.id})  # passing user_id as a payload

    # to get user id from token of password reset
    @staticmethod
    def verify_reset_token(token):
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            user_id = s.loads(token, max_age=120)['user_id']
        except:
            return None
        return User.query.get(user_id)

    def __repr__(self):  # this will set how class objects will printed
        return 'User({},{},{})'.format(self.username, self.email,self.image_file)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False) # small letter user is table name from that we are getting id column as user.id

    def __repr__(self):
        return 'Post({},{})'.format(self.title, self.date_posted)