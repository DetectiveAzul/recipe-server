const express = require('express');
const router = express.Router();
const db = require('../db/queries/recipeQueries.js');

router.get('/', (req, res) => {
  console.log('User entered Recipes index');
  db.getAllRecipes;
});

module.exports = router;
