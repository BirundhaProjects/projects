const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const { MONGODB_URL, PORT } = require("../config/index");
const port = PORT || 5001;
const usersRoutes = require("../routes/usersRoutes");

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON bodies

//Connect to MongoDB
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Timeout after 30 seconds if no connection
  })
  .then(() => {
    console.log("Connected to MongoDB...!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit if connection fails
  });

// Use user routes for all paths that start with "/users"
app.use("/users", usersRoutes); // Prefix all user-related routes with "/users"

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
