const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5001;

app.use(cors()); // Enable CORS

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
