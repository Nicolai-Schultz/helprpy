from flask import Flask, redirect, url_for, render_template, request, session, flash
from datetime import timedelta
from datetime import datetime
from sqlalchemy import Column, Integer, String
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin


app = Flask(__name__)
db = SQLAlchemy(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.sql'
app.static_folder = 'static'
#app.secret_key = "hello"
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.sqlite3'
#app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SECRET_KEY'] = 'hejmeddig'
app.permanent_session_lifetime = timedelta(days=1)



#første login database
"""class users(db.Model):
    _id = db.Column("id",db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))

    def __init__(self, name, email):
        self.name = name
        self.email = email"""

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(80), nullable=False)


@app.route("/")
def home():
    return render_template("index.html")

@app.route("/hjem")
def hjem():

    return render_template("hjem.html")

@app.route("/logind")
def logind():

    return render_template("logind.html")

@app.route("/register")
def register():

    return render_template("register.html")


"""@app.route("/view")
def view():
    return render_template("view.html", values = users.query.all())
@app.route("/login", methods=["POST","GET"])
def login():
    if request.method == "POST":
        session.permanent=True
        user = request.form["nm"]
        session["user"] = user

        found_user = users.query.filter_by(name=user).first()
        if found_user:
            session["email"] = found_user.email
        else:
            usr = users(user, "")
            db.session.add(usr)
            db.session.commit()


        flash("Du er nu logget ind", "info")
        return redirect(url_for("user"))
    else:
        if "user" in session:
            flash("Du er allerede logget ind", "info")
            return redirect(url_for("user"))
        
        return render_template("login.html")
    

@app.route("/user", methods=["POST","GET"])
def user():
    email = None
    if "user" in session:
        user = session["user"]

        if request.method == "POST":
            email = request.form["email"]
            session["email"] = email
            found_user = users.query.filter_by(name=user).first()
            if found_user:
                found_user.email = email
                db.session.commit()
                flash("Email er gemt!")
            else:
                flash("Brugeren blev ikke fundet", "error")
        else:
            if "email" in session:
                email=session["email"]

        return render_template("user.html", email=email)
    else:
        flash("Du er ikke logget ind", "info")
        return redirect(url_for("login"))

@app.route("/logout")
def logout():
    flash("Du er nu logget ud", "info")
    session.pop("user", None)
    session.pop("email", None)
    session.pop("hej", None)
    return redirect(url_for("login"))
"""
@app.route("/feedback")
def feedback():
    return render_template("feedback.html")

@app.route("/tildeltnummer", methods=["GET", "POST"])
def tildeltnummer():
        return render_template("tildeltnummer.html")
    

@app.route("/kreditmax", methods=["POST","GET"])
def kreditmax():
    return render_template("kreditmax.html")

if __name__ == "__main__":
    #with app.app_context():
        #db.create_all()
    app.run(debug=True)
    
    