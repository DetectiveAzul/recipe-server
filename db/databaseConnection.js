const promise = require('bluebird');
const options = {
  // Initialization Options
  promiseLib: promise
};
const config = require('./config.js');
const pgp = require('pg-promise')(options);
const db = pgp(config.databaseConfig);

module.exports = db;
