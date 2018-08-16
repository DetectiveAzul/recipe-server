const Router = require('koa-router');
const router = new Router();
//queries
const queries = require('../../db/queries/recipesQueries.js');

const BASE_URL = `/api/recipes`;

router.get(BASE_URL, async (ctx) => {
  try {
    const recipes = await queries.getAll;
    ctx.body = {
      status: 'success',
    };
    console.log(recipes);
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const queries = require('../../db/queries/recipesQueries.js')
// //defining variables and methods
//
//
// router.get('/', queries.getAll);
// router.get('/:id', queries.getOne);
//
// router.post('/', queries.addOne);
//
// router.put('/:id', queries.updateOne);
//
// router.delete('/', queries.deleteAll);
// router.delete('/:id', queries.deleteOne);
//
// module.exports = router;
