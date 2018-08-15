const express = require('express');
const router = express.Router();
const db = require('../db/queries/recipeQueries.js');
//defining variables and methods


router.get('/', (req, res) => {
  console.log('User entered Recipes index');
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
});

module.exports = router;
