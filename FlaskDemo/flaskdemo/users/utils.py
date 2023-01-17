import secrets, os
from PIL import Image
from flask import url_for
from flask import current_app
from flask_mail import Message
from flaskdemo import mail

def save_picture(form_picture):
    random_hex = secrets.token_hex(8)
    f_name, f_ext = os.path.splitext(form_picture.filename)
    picture_name = random_hex + f_ext
    picture_path = os.path.join(current_app.root_path, 'static/profile_pics', picture_name)

    # to resize image
    output_size = (200,200)
    new_pic = Image.open(form_picture)
    new_pic.thumbnail(output_size)

    new_pic.save(picture_path)
    return picture_name

def send_reset_email(user):
    token = user.generate_refresh_token()
    msg = Message('Password Reset Request', sender='noreply@demo.com', recipients=[user.email])
    # external true is used to get absolute url
    msg.body = f'''
    To reset your password, visit following link:
    {url_for('users.reset_token', token=token, _external=True)}

    If you did not make this request, ignore this email.
    '''
    mail.send(msg)