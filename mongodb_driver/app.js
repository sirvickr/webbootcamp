const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://localhost:27017";

// Database name
const dbName = "fruitsDB";

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

// Use connect method to connect to the Server
client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to the server");

    const db = client.db(dbName);

    findDocuments(db, function(fruits) { 
        console.log(`Found ${fruits.length} records`);
        if(fruits.length > 0) {
            console.log(fruits);
            client.close(); 
        } else {
            insertDocuments(db, function() { 
                client.close(); 
            });
        }
    });
});

const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection("fruits");
    // Find documents
    collection.find({}).toArray(function(err, fruits) {
        assert.equal(null, err);
        callback(fruits);
    });
}

const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection("fruits");
    // Insert some documents
    collection.insertMany(
        [
            {
                name: "Apple",
                score: 8,
                review: "Greate fruit"
            },
            {
                name: "Orange",
                score: 6,
                review: "Kinda sour"
            },
            {
                name: "Banana",
                score: 9,
                review: "Great stuff!"
            }
        ],
        function(err, result) {
            assert.equal(err, null);
            console.log("Inserted 3 documents into the collection");
            callback(result);
        }
    );
};
