const authService = require('../services/authService');
const jwtUtils = require('../utils/jwtUtils');

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = authService.authenticateUser(username, password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwtUtils.generateToken(user);
  res.json({ token });
};
