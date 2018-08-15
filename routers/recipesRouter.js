const express = require('express');
const router = express.Router();
const queries = require('../db/queries/recipeQueries.js')
//defining variables and methods


router.get('/', queries.getAll);

module.exports = router;
