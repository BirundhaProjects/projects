const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5001;
const mongodb = require("mongodb").MongoClient
const {PORT, MONGODB_URL} = require('../config/index');

app.use(cors()); // Enable CORS

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

//Connect to MongoDB
let database;
let connectdb = async () => {
  const connection = await mongodb.connect(MONGODB_URL)
  database = await connection.db("todo_Database");
  console.log("Connected to MongoDB...!👍");
  await database.createCollection("todo");
  console.log("Created todo collection....!");
}
connectdb()

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
