//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const workItems = [];

// Connection URL
//const url = "mongodb+srv://admin:<password>@vickr.fsdbp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const url = "mongodb+srv://admin:p25vZubG@vickr.fsdbp.mongodb.net/";
//const url = "mongodb://localhost:27017/";

// Database name
const dbName = "todolist";

// Connect to the database (it is created if necessary)
mongoose.connect(url + dbName, { useNewUrlParser: true });
console.log("connected to", url)

// Create schema of 'Item'
const itemSchema = new mongoose.Schema({
  name: String,
  done: Boolean
});

// Create a collection "items"
const Item = mongoose.model("Item", itemSchema);

// Create schema of 'List'
const listSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema]
});

// Create a collection "lists"
const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {
  const day = date.getDate();
  Item.find({}, function(err, items) {
    if(err) {
      console.log("get '/' error", err);
    } else {
      res.render("list", {today: day, listTitle: "Main", newListItems: items});
    }
  });
});

app.post("/", function(req, res) {
  const listName = req.body.list;
  const itemName = req.body.newItem;
  const item = new Item({ name: itemName, done: false });
  if (listName === "Main") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, function(err, list) {
      list.items.push(item);
      list.save();
      res.redirect("/" + listName);
    });
  }
});

app.post("/toggle", function(req, res) {
  const listName = req.body.list;
  const itemId = req.body.itemId;
  let checked = req.body.done ? true : false;
  if (listName === "Main") {
    Item.updateOne({_id: itemId}, {done: checked}, function(err, result) {
      if(err) {
        console.log(err);
      } else {
        console.log("updated:", result);
      }
      res.redirect("/");
    });
  } else {
    // List.findOneAndUpdate({'items._id': itemId}, {'$set': {'items.$.done': checked}}, function(err, result) {
    List.findOneAndUpdate({name: listName, items: {$elemMatch: {_id: itemId}}}, {$set: {"items.$.done" : checked}}, function(err, result) {
      if(err) {
        console.log(err);
      } else {
        console.log("updated:", result);
      }
      res.redirect("/" + listName);
    });
  }
});

app.post("/delete", function(req, res) {
  const listName = req.body.list;
  if (listName === "Main") {
    Item.deleteMany({done: true}, function(err, result) {
      if(err) {
        console.log(err);
      } else {
        console.log("deleted:", result);
      }
      res.redirect("/");
    });
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {done: true}}}, function(err, result) {
      if(err) {
        console.log(err);
      } else {
        console.log("updated:", result);
      }
      res.redirect("/" + listName);
    });
  }
});

app.get("/:list", function(req, res) {
  const listName = _.capitalize(req.params.list);
  const day = date.getDate();
  console.log("get:", listName);
  List.findOne({name: listName}, function(err, list) {
    if(err) {
      console.log("get /" + listName + "/ error", err);
    } else {
      if(list) {
        res.render("list", {today: day, listTitle: listName, newListItems: list.items});
      } else {
        list = new List({ name: listName, items: [] });
        list.save();
        res.redirect("/" + listName);
      }
    }
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});

let port = process.env.PORT || 3000;
app.listen(3000, function() {
  console.log("Server started on port " + port);
});
