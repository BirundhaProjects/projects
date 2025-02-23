const jwt = require("jsonwebtoken");
const { AUTH } = require("../config/index");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Extract token from request header

  // If there's no token, return an error response
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, AUTH);

    // Attach the decoded user information to the request object (for further use in route handlers)
    req.user = decoded.user;

    // Proceed to the next middleware/route handler
    next();
  } catch (error) {
    // If token is invalid or expired, return an error response
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { authMiddleware };
