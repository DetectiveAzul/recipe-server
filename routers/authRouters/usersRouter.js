const Router = require('koa-router');
const router = new Router();
//queries
const queries = require('../../db/queries/ingredientsQueries.js');

const BASE_URL = `/auth`;


//REGISTER VIEW
router.get(`${BASE_URL}/register`, async (ctx) => {
  try {

  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

//REGISTER USER
router.post(`${BASE_URL}/register`, async (ctx) => {
  try {

  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

//LOGIN VIEW
router.get(`${BASE_URL}/login`, async (ctx) => {
  try {

  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

//LOG USER IN
router.post(`${BASE_URL}/login`, async (ctx) => {
  try {

  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

//STATUS PAGE
router.get(`${BASE_URL}/status`, async (ctx) => {
  try {

  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

//LOG USER OUT
router.get(`${BASE_URL}/logout`, async (ctx) => {
  try {

  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});


module.exports = router;
