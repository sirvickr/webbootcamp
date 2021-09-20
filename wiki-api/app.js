//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wiki", {useNewUrlParser: true});

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", function(req, res) {
    Article.find(function(err, articles) {
        if(!err) {
            res.send(articles);
        } else {
            console.log("Query error:", err);
            res.send(err);
        }
    });
});

app.post("/articles", function(req, res) {
    const article = new Article({
        title: req.body.title,
        content: req.body.content
    });
    article.save(function(err) {
        if(!err) {
            res.send("The article is successfulled added.")
        } else {
            res.send(err);
        }
    });
});

app.delete("/articles", function(req, res) {
    Article.deleteMany({}, function(err) {
        if(err) {
            res.send("Successfully deleted all articles.");
        } else {
            res.send(err);
        }
    });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
