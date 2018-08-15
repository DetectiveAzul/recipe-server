const promise = require('bluebird');
const options = {
  // Initialization Options
  promiseLib: promise
};
const config = require('../config.js');
const pgp = require('pg-promise')(options);
const db = pgp(config.databaseConfig);

// GET ALL RECIPES
const getAll = (req, res, next) => {
  db.any('SELECT * FROM recipes')
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: `Retrieved ${data.length} recipes`
        });
    })
    .catch((err) => {
      return next(err);
    });
};

// GET SINGLE RECIPE
const get = (req, res, next) => {
  const id = parseInt(req.params.id);
  db.one('SELECT * FROM recipes WHERE id = $1', id)
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: `Retrieved ${data.length} recipe`
        });
    })
    .catch((err) => {
      return next(err);
    });
};

// ADD NEW RECIPE
const post = (req, res, next) => {
  db.none('INSERT INTO recipes(name, description) ' +
  'VALUES (${name}, ${description})', req.body.payload)
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one recipe'
        });
    })
    .catch((err) => {
      return next(err);
    });
};

// EDIT ONE RECIPE
const put = (req, res, next) => {
  db.none('UPDATE recipes SET name=$1, description=$2 WHERE id=$3',
    [req.body.name, req.body.description, parseInt(req.params.id)])
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: `Updated Recipe`
        });
    })
    .catch((err) => {
      return next(err);
    });
};

// DELETE ONE RECIPE
const deleteOne = (req, res, next) => {
  const id = parseInt(req.params.id);
    db.result('DELETE FROM recipes WHERE id = $1', id)
      .then((result) => {
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} recipe`
          });
      })
      .catch((err) => {
        return next(err);
      });
};

// DELETE ALL RECIPES
const deleteAll = (req, res, next) => {
    db.result('DELETE FROM recipes')
      .then((result) => {
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} recipe`
          });
      })
      .catch((err) => {
        return next(err);
      });
};

// exporting query functions
module.exports = {
    getAll: getAll,
    get: get,
    post: post,
    put: put,
    deleteOne: deleteOne,
    deleteAll: deleteAll,
}
