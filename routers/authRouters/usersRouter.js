const Router = require('koa-router');
const router = new Router();
//File system
const fs = require('fs');
const passport = require('koa-passport');
//queries
const queries = require('../../db/queries/ingredientsQueries.js');

const BASE_URL = `/auth`;


//REGISTER VIEW
router.get(`${BASE_URL}/register`, async (ctx) => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream('./views/register.html');
});

//REGISTER USER
router.post(`${BASE_URL}/register`, async (ctx) => {
  ctx.body = 'Moved to post page'
});

//LOGIN VIEW
router.get(`${BASE_URL}/login`, async (ctx) => {
});

//LOG USER IN
router.post(`${BASE_URL}/login`, async (ctx) => {
});

//STATUS PAGE
router.get(`${BASE_URL}/status`, async (ctx) => {
});

//LOG USER OUT
router.get(`${BASE_URL}/logout`, async (ctx) => {
});


module.exports = router;
