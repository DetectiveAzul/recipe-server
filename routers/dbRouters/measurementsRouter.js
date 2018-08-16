const Router = require('koa-router');
const router = new Router();
const queries = require('../../db/queries/measurementsQueries.js')


//INDEX
router.get(`${BASE_URL}`, async (ctx) => {
  ctx.body = {
    status: 'success',
  };
});

//SHOW
router.get(`${BASE_URL}/:id`, async (ctx) => {
  ctx.body = {
    status: 'success',
  };
});

//CREATE
router.post(`${BASE_URL}`, async (ctx) => {
  ctx.body = {
    status: 'success',
  };
});

//UPDATE
router.put(`${BASE_URL}/:id`, async (ctx) => {
  ctx.body = {
    status: 'success',
  };
});

//DESTROY ALL
router.delete(`${BASE_URL}/`, async (ctx) => {
  ctx.body = {
    status: 'success',
  };
});

//DESTROY ONE
router.delete(`${BASE_URL}/:id`, async (ctx) => {
  ctx.body = {
    status: 'success',
  };
});
