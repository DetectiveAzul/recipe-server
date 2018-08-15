const express = require('express');
const router = express.Router();
const queries = require('../db/queries/recipeQueries.js')
//defining variables and methods


router.get('/', queries.getAll);
router.get('/:id', queries.get);
router.post('/', queries.post);
router.put('/:id', queries.put);
router.delete('/', queries.deleteAll);
router.delete('/:id', queries.deleteOne);

module.exports = router;
