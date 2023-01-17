from flask import render_template, url_for, redirect, flash, request, Blueprint
from flask_login import login_user, current_user, logout_user, login_required
from flaskdemo import db, bcrypt
from flaskdemo.models import User, Post
from flaskdemo.users.forms import RegistrationForm, LoginForm, AccountInfoUpdate, RequestResetForm, ResetPasswordForm
from flaskdemo.users.utils import save_picture, send_reset_email

users = Blueprint('users', __name__)

@users.route("/register", methods=['GET', 'POST']) # to handle post and get request, get when url is hi and post when form is submit, same function get called
def register_func():
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    form = RegistrationForm()  # create instance of registration form
    if form.validate_on_submit():
        hashed_pw = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user = User(username=form.username.data, email=form.email.data, password=hashed_pw)
        db.session.add(user)
        db.session.commit()
        flash(f'Account Created Successfully for {form.username.data.capitalize()}', 'success')  # bootstrap category success is passed as 2nd argument
        return redirect(url_for('users.login_func'))
    print('form data', form.data)
    return render_template('register.html', title='Register', form=form)

@users.route("/login", methods=['GET', 'POST'])
def login_func():
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    form = LoginForm()  # create instance of login form
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data): # check if user exists and password match
            login_user(user, remember=form.remember.data) # login to system
            next_page = request.args.get('next')
            return redirect(url_for('users.account_func')) if next_page else redirect(url_for('main.home'))
        else:
            flash('Login Unsuccessful!', 'danger')
    return render_template('login.html', title='Login', form=form)

@users.route("/logout")
def logout_func():
    logout_user()
    return redirect(url_for('main.home'))

@users.route("/account", methods=['GET', 'POST'])
@login_required
def account_func():
    form = AccountInfoUpdate()
    if form.validate_on_submit():
        if form.picture.data:
            picture_file = save_picture(form.picture.data)
            current_user.image_file = picture_file
        current_user.username = form.username.data
        current_user.email = form.email.data
        db.session.commit()
        flash('Your account has been updated', 'success')
        return redirect(url_for('users.account_func'))
    elif request.method == 'GET':
        form.username.data = current_user.username
        form.email.data = current_user.email
    image_file = url_for('static', filename='profile_pics/' + current_user.image_file)
    return render_template('account.html', title='Account', image_file=image_file, form=form)

# Function to get specific users post only
@users.route("/user/<string:username>")
def user_post(username):
    # post_data = Post.query.all()  # to get all posts
    # to get post by pagination
    page = request.args.get('page', 1, type=int)  # to create route with page in url
    user = User.query.filter_by(username=username).first_or_404()
    post_data = Post.query.filter_by(author=user)\
                .order_by(Post.date_posted.desc())\
                .paginate(page=page, per_page=2)  # to get the latest post first
    return render_template('user_post.html', posts=post_data, user=user)

@users.route("/reset_password", methods=['GET', 'POST'])
def reset_request(): # Function or route to accept email for which password is need to reset
    # if user is already logged in then he will be redirected to home page
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    form = RequestResetForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        send_reset_email(user)
        flash('Email has been sent to reset your password.', 'info')
        return redirect(url_for('users.login_func'))

    return render_template('reset_request.html', title="Reset Password", form=form)

@users.route("/reset_password/<token>", methods=['GET', 'POST'])
def reset_token(token): # function or route which actually reset the password
    # if user is already logged in then he will be redirected to home page
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    # get user from token passed in url
    user = User.verify_reset_token(token)
    if not user:
        flash('That is invalid or expired token', 'warning')
        return redirect(url_for('users.reset_request'))
    form = ResetPasswordForm()
    if form.validate_on_submit():
        hashed_pw = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user.password = hashed_pw
        db.session.commit()
        flash('Password is updated!', 'success')  # bootstrap category success is passed as 2nd argument
        return redirect(url_for('users.login_func'))
    return render_template('reset_token.html', title="Reset Password", form=form)

