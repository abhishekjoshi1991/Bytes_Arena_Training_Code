from flask import render_template, request, Blueprint
from flaskdemo.models import Post

main = Blueprint('main', __name__)

@main.route("/")
@main.route("/home")
def home():
    # post_data = Post.query.all()  # to get all posts
    # to get post by pagination
    page = request.args.get('page', 1, type=int)  # to create route with page in url
    post_data = Post.query.order_by(Post.date_posted.desc()).paginate(page=page, per_page=2)  # to get the latest post first
    return render_template('home.html', posts=post_data)

@main.route("/about")
def about():
    return render_template('about.html', title='About')