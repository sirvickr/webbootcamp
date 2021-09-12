//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

const posts = [
  {
    title: "Post1",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In nibh mauris cursus mattis molestie a iaculis at. In egestas erat imperdiet sed euismod. Rhoncus mattis rhoncus urna neque viverra justo. Arcu vitae elementum curabitur vitae nunc. Dolor sit amet consectetur adipiscing elit duis. Vitae nunc sed velit dignissim sodales ut eu sem integer. Et malesuada fames ac turpis egestas sed tempus urna et. Vitae et leo duis ut diam quam. Morbi quis commodo odio aenean sed adipiscing diam. Placerat vestibulum lectus mauris ultrices eros in cursus. Tempor nec feugiat nisl pretium fusce."
  },
  {
    title: "Another post",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Augue interdum velit euismod in. A pellentesque sit amet porttitor. Quisque sagittis purus sit amet volutpat consequat. Aliquam sem et tortor consequat. Eget aliquet nibh praesent tristique magna sit amet purus. Ligula ullamcorper malesuada proin libero nunc consequat interdum. Consequat ac felis donec et. Justo nec ultrices dui sapien eget. Et ligula ullamcorper malesuada proin. Sed ullamcorper morbi tincidunt ornare massa. Ut lectus arcu bibendum at varius vel pharetra vel turpis. Quam elementum pulvinar etiam non. Sociis natoque penatibus et magnis dis parturient montes nascetur."
  },
  {
    title: "One more post",
    content: "message3"
  },
  {
    title: "Final post",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis risus sed vulputate odio ut. Ornare arcu dui vivamus arcu felis bibendum ut tristique. Accumsan tortor posuere ac ut. Eget magna fermentum iaculis eu non diam phasellus vestibulum lorem. Tempor commodo ullamcorper a lacus vestibulum. Placerat vestibulum lectus mauris ultrices eros in cursus turpis massa. Dignissim convallis aenean et tortor at risus viverra adipiscing. Etiam sit amet nisl purus in mollis nunc. Viverra mauris in aliquam sem fringilla. Porttitor leo a diam sollicitudin tempor id eu nisl nunc."
  }
];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render("home", { 
    startingContent: homeStartingContent,
    posts: posts 
  });
});

app.get("/posts/:title", (req, res) => {
  console.log(req.params.title + ": ");
  posts.every((element, index) => {
    console.log(`${index}\t${element.title}: ${element.content}`);
    if(_.lowerCase(element.title) == _.lowerCase(req.params.title)) {
      res.render("post", post = element);
      return false;
    }
    return true;
  });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});


app.get("/about", (req, res) => {
  res.render("about", { content: aboutContent });
});


app.get("/contact", (req, res) => {
  res.render("contact", { content: contactContent });
});










app.listen(3000, function() {
  console.log("Server started on port 3000");
});
