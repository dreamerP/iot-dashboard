const authService = require("../services/authService");
const jwtUtils = require("../utils/jwtUtils");
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = authService.authenticateUser(username, password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwtUtils.generateToken(user);
  res.json({ token });
};

exports.checkAuth = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, jwtUtils.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }
    res.status(200).json(decoded);
  });
};
