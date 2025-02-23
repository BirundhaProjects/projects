const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/usersSchema");
const { AUTH } = require("../config/index");

// Register User
const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  // Check if user with given email already exists
  const existingUser = await Users.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email is already in use" });
  }

  try {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new Users({
      fullName,
      email,
      password: hashedPassword,
    });

    // Save user to the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ user: { id: newUser._id } }, AUTH, {
      expiresIn: "1h",
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error registering user" });
  }
};

module.exports = { registerUser };
