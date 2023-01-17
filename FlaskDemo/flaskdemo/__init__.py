from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_mail import Mail
from flaskdemo.config import Config



db = SQLAlchemy()
bcrypt = Bcrypt()
login_manager = LoginManager()
login_manager.login_view = 'users.login_func' #--> this will display message that please login to access page with login screen, localhost/account

mail = Mail()

# from flaskdemo.models import User, Post

def create_app(config_app=Config):
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    mail.init_app(app)
    app.app_context().push()
    db.create_all()

    # registering blueprints
    from flaskdemo.users.routes import users
    from flaskdemo.posts.routes import posts
    from flaskdemo.main.routes import main
    from flaskdemo.errors.handlers import errors

    app.register_blueprint(users)
    app.register_blueprint(posts)
    app.register_blueprint(main)
    app.register_blueprint(errors)

    return app