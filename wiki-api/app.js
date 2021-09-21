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

app.route("/articles")

.get(function(req, res) {
    Article.find(function(err, articles) {
        if(!err) {
            res.send(articles);
        } else {
            console.log("Query error:", err);
            res.send(err);
        }
    });
})

.post(function(req, res) {
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
})

.delete(function(req, res) {
    Article.deleteMany({}, function(err) {
        if(err) {
            res.send("Successfully deleted all articles.");
        } else {
            res.send(err);
        }
    });
});

app.route("/articles/:title")

.get(function(req, res) {
    Article.findOne({title: req.params.title}, function(err, article) {
        if(!err) {
            res.send(article);
        } else {
            console.log("Query error:", err);
            res.send(err);
        }
    });
})

.put(function(req, res) {
    console.log("PUT:", `/articles/${req.params.title} -> {title: ${req.body.title}, content: ${req.body.content}}`);
    Article.findOneAndUpdate(
        {title: req.params.title}, 
        {title: req.body.title, content: req.body.content}, 
        {overwrite: true},
        function(err, result) {
            if(!err) {
                res.send(`The article title "${req.params.title}" is successfulled updated.`);
                console.log(`The article title "${req.params.title}" is successfulled updated:`, result);
            } else {
                console.log("PUT error:", err);
                res.send(err);
            }
        }
    );
})

.patch(function(req, res) {
    console.log("PATCH:", `/articles/${req.params.title} -> {title: ${req.body.title}, content: ${req.body.content}}`);
    Article.findOneAndUpdate(
        {title: req.params.title}, 
        {$set: req.body}, 
        function(err, result) {
            if(!err) {
                res.send(`The article title "${req.params.title}" is successfulled patched.`);
                console.log(`The article title "${req.params.title}" is successfulled patched:`, result);
            } else {
                console.log("PATCH error:", err);
                res.send(err);
            }
        }
    );
})

.delete(function(req, res) {
    console.log("DELETE:", `/articles/${req.params.title}:`);
    Article.deleteOne({title: req.params.title}, function(err, result) {
        if(!err) {
            if(result.deletedCount > 0) {
                res.send(`The article with title "${req.params.title}" is successfulled deleted.`);
            } else {
                res.send(`The article with title "${req.params.title}" is not found.`);
            }
            console.log("The article is successfulled deleted:", result);
        } else {
            console.log("Deletion error:", err);
            res.send(err);
        }
    });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

/* Sample content for testing and debugging
{
    "_id" : "5c18e1892998bdb3b3d355bf",
    "title" : "REST",
    "content" : "REST is short for REpresentational State Transfer. IIt's an architectural style for designing APIs."
}


{
    "_id" : ObjectId("5c139771d79ac8eac11e754a"),
    "title" : "API",
    "content" : "API stands for Application Programming Interface. It is a set of subroutine definitions, communication protocols, and tools for building software. In general terms, it is a set of clearly defined methods of communication among various components. A good API makes it easier to develop a computer program by providing all the building blocks, which are then put together by the programmer."
}


{
    "_id" : ObjectId("5c1398aad79ac8eac11e7561"),
    "title" : "Bootstrap",
    "content" : "This is a framework developed by Twitter that contains pre-made front-end templates for web design"
}


{
    "_id" : ObjectId("5c1398ecd79ac8eac11e7567"),
    "title" : "DOM",
    "content" : "The Document Object Model is like an API for interacting with our HTML"
}


{
    "_id" : "5c18f35cde40ab6cc551cd60",
    "title" : "Jack Bauer",
    "content" : "Jack Bauer once stepped into quicksand. The quicksand couldn't escape and nearly drowned.",
    "__v" : 0
}

{
    "_id" : "5c18f35cde40ab6cc551cd61",
    "title" : "Chuck Norris",
    "content" : "Chuck Norris uses pepper spray to season his meat."
}
*/
