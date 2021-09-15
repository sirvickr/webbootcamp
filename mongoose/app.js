const mongoose = require("mongoose");

// Connection URL
const url = "mongodb://localhost:27017/";

// Database name
const dbName = "fruitsDB";

// Connect to the database (it is created if necessary)
mongoose.connect(url + dbName, { useNewUrlParser: true });

// Create schema of a collection element
const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
});

// Create a collection "fruits"
const Fruit = mongoose.model("Fruit", fruitSchema);

// Create a single document
const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Pretty solid as a fruit."
});

// Save it to the collection
fruit.save();

// Create and same several documents
const kiwi = new Fruit({
    name: "Kiwi",
    rating: 10,
    review: "The best fruit!"
});

const orange = new Fruit({
    name: "Orange",
    rating: 4,
    review: "Too sour for me"
});

const banana = new Fruit({
    name: "Banana",
    rating: 3,
    review: "Weird texture"
});

Fruit.insertMany([kiwi, orange, banana], function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("Successfully saved all the fruits to the database");
    }
    mongoose.connection.close();
});
