from flaskdemo import create_app  # imports from init file
app = create_app()

if __name__ == '__main__':
    app.run(debug=True)

