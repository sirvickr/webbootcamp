//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs"); // interestingly, everything works without it
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

const userSchema = {
    email: String,
    password: String
};

const User = mongoose.model("User", userSchema);

app.get("/", function(req, res) {
    res.render("home");
});


app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", function(req, res) {
    User.findOne({
        email: req.body.username,
        password: req.body.password
    }, function(err, user) {
        if(err) {
            console.log("Authentication error:", err);
        } else if(!user) {
            res.send("Wrong email or password");
        } else {
            res.render("secrets");
        }
    });
});


app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
    const user = new User({
        email: req.body.username,
        password: req.body.password
    });
    user.save(function(err) {
        if(!err) {
            res.render("secrets");
        } else {
            console.log("Registration error:", err);
        }
    });
});





let port = process.env.PORT || 3000;
app.listen(3000, function() {
  console.log("Server started on port " + port);
});
