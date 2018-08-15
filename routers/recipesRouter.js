const express = require('express');
const router = express.Router();
const queries = require('../db/queries/recipeQueries.js')
//defining variables and methods


router.get('/', queries.getAll);
router.get('/:id', queries.getOne);

router.post('/', queries.addOne);

router.put('/:id', queries.updateOne);

router.delete('/', queries.deleteAll);
router.delete('/:id', queries.deleteOne);

module.exports = router;
