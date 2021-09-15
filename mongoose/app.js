const mongoose = require("mongoose");

// Connection URL
const url = "mongodb://localhost:27017/";

// Database name
const dbName = "fruitsDB";

// Connect to the database (it is created if necessary)
mongoose.connect(url + dbName, { useNewUrlParser: true });
