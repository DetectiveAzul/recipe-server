const Router = require('koa-router');
const router = new Router();
//queries
const queries = require('../../db/queries/recipesQueries.js');
const db = require('../../db/databaseConnection.js');

const BASE_URL = `/api/recipes`;


//INDEX
router.get(`${BASE_URL}`, async (ctx) => {
  try {
    const data = await queries.getAll();
    ctx.body = {
      status: 'success',
      data: data
    };
  } catch (err) {
    console.log(err);
  }
})

//SHOW
router.get(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const data = await queries.getOne(ctx.params.id);
    ctx.body = {
      status: 'success',
      data: data
    };
  } catch (err) {
    console.log(err);
  }
});

//CREATE
router.post(`${BASE_URL}`, async (ctx) => {
  try {
    const dataId = await queries.addOne(ctx.request.body);
    ctx.body = {
      status: 'success',
      entry_created: dataId
    };
  } catch (err) {
    console.log(err);
  }
});

//UPDATE
router.put(`${BASE_URL}/:id`, async (ctx) => {
  try {

  } catch (err) {
    console.log(err);
  }
});

//DESTROY ALL
router.delete(`${BASE_URL}/`, async (ctx) => {
  try {

  } catch (err) {
    console.log(err);
  }
});

//DESTROY ONE
router.delete(`${BASE_URL}/:id`, async (ctx) => {
  try {

  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
