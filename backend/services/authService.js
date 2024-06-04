const fs = require('fs');
const path = require('path');
const jwtUtils = require('../utils/jwtUtils');
const usersFilePath = path.join(__dirname, '../utils/data/users.json');

let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

exports.getUserById = (id) => {
  return users.find(user => user.id === id);
};

exports.authenticateUser = (username, password) => {
  return users.find(user => user.username === username && user.password === password);
};
