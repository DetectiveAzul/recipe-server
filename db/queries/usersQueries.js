// Connect to the database
const db = require('../databaseConnection.js');

const addUser = (body) => {
  return db.one('INSERT INTO users(username, password) ' +
  'VALUES (${username}, ${password}) RETURNING *', body);
};

module.exports = {
  addUser: addUser
};
