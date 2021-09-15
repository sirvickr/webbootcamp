//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const workItems = [];

// Connection URL
const url = "mongodb://localhost:27017/";

// Database name
const dbName = "todolist";

// Connect to the database (it is created if necessary)
mongoose.connect(url + dbName, { useNewUrlParser: true });

// Create schema of 'Item'
const itemSchema = new mongoose.Schema({
  name: String
});

// Create a collection "items"
const Item = mongoose.model("Item", itemSchema);

app.get("/", function(req, res) {

const day = date.getDate();

  Item.find({}, function(err, items) {
    res.render("list", {listTitle: day, newListItems: items});
  });

});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    new Item({ name: item }).save();
    res.redirect("/");
  }
});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
