const mongoose = require("mongoose");

// Connection URL
const url = "mongodb://localhost:27017/";

// Database name
const dbName = "fruitsDB";

// Connect to the database (it is created if necessary)
mongoose.connect(url + dbName, { useNewUrlParser: true });

// Create schema of a collection element 'Fruit'
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Fruit requires a name"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

// Create a collection "fruits"
const Fruit = mongoose.model("Fruit", fruitSchema);

// Create a single document
const apple = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Pretty solid as a fruit."
});

// Save it to the collection
apple.save();

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

// Create schema of a collection element 'Person'
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

// Create a collection "people"
const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name: "Amy",
    age: 12,
    favouriteFruit: kiwi
});

person.save();

Fruit.insertMany([kiwi, orange, banana], function(err, result) {
    if(err) {
        console.log(err);
    } else {
        console.log("Successfully saved all the fruits to the database:");
        console.log(result);

        Fruit.updateOne({ name: "Orange" }, { rating: 7 }, function(err, result) {
            if(err) {
                console.log(err);
            } else {
                console.log("Successfully updated the document:");
                console.log(result);
            }

            Fruit.find(function(err, result) {
                if(err) {
                    console.log(err);
                } else {
                    console.log(result);
                }

                Fruit.deleteMany({ rating: 7 }, function(err, result) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("Successfully deleted the documents:");
                        console.log(result);
                    }

                    mongoose.connection.close();
                });
            });
    
        });
    }
});

/* Finally:
> db.fruits.find()
{ "_id" : ObjectId("6141c200669fdf3e712621aa"), "name" : "Kiwi", "rating" : 10, "review" : "The best fruit!", "__v" : 0 }
{ "_id" : ObjectId("6141c200669fdf3e712621ac"), "name" : "Banana", "rating" : 3, "review" : "Weird texture", "__v" : 0 }
> db.people.find()
{ "_id" : ObjectId("6141c200669fdf3e712621ad"), "name" : "Amy", "age" : 12, "favouriteFruit" : { 
    "name" : "Kiwi", "rating" : 10, "review" : "The best fruit!", "_id" : ObjectId("6141c200669fdf3e712621aa") 
}, "__v" : 0 }

*/