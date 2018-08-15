const promise = require('bluebird');
const options = {
  // Initialization Options
  promiseLib: promise
};
const config = require('../config.js');
const pgp = require('pg-promise')(options);
const db = pgp(config.databaseConfig);

// add query functions
const getAllRecipes = (req, res, next) => {
  db.any('SELECT * FROM recipes')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL recipes'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

// exporting query functions
// module.exports = db;
module.exports = {
    getAll: getAllRecipes
}
