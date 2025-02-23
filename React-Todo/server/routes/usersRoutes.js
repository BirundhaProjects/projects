const express = require("express");
const { registerUser } = require("../controllers/usersController"); // Import controller
const { authMiddleware } = require("../middleware/authMiddleware"); // Import authentication middleware

const router = express.Router();

// User Registration Route
router.post("/register", registerUser); // POST /register - Register a new user

// Example of a protected route that requires authentication
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: `Welcome ${req.user.fullName}`, user: req.user });
});

module.exports = router;
