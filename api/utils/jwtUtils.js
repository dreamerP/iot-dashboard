const jwt = require('jsonwebtoken');

const secret = 'jwt_secret_iot_app'; 

exports.secret = secret;

exports.generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '1h' });
};
