const Router = require('koa-router');
const router = new Router();
//File system
const fs = require('fs');
const passport = require('koa-passport');
//queries
const queries = require('../../db/queries/usersQueries.js');

const BASE_URL = `/auth`;


//REGISTER VIEW
router.get(`${BASE_URL}/register`, async (ctx) => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream('./views/register.html');
});

//REGISTER USER
router.post(`${BASE_URL}/register`, async (ctx) => {
  const user = await queries.addUser(ctx.request.body);
  return passport.authenticate('local', (err, user, info, status) => {
    if (user) {
      ctx.status = 201;
      ctx.login(user);
      ctx.redirect('/auth/status');
    } else {
      ctx.status = 400;
      ctx.body = { status: 'error' };
    }
  })(ctx);
});

//LOGIN VIEW
router.get(`${BASE_URL}/login`, async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./views/login.html');
    } else {
    ctx.redirect('/auth/status');
  };
});

//LOG USER IN
router.post(`${BASE_URL}/login`, async (ctx) => {
  return passport.authenticate('local', (err, user, info, status) => {
    if (user) {
      ctx.login(user);
      ctx.redirect('/auth/status');
    } else {
      ctx.status = 400;
      ctx.body = { status: 'error' };
    }
  })(ctx);
});

//STATUS PAGE
router.get(`${BASE_URL}/status`, async (ctx) => {
    if (ctx.isAuthenticated()) {
      ctx.type = 'html';
      ctx.body = fs.createReadStream('./views/status.html');
    } else {
      ctx.redirect('/auth/login');
    }
});

//LOG USER OUT
router.get(`${BASE_URL}/logout`, async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.logout();
    ctx.redirect('/auth/login');
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
});


module.exports = router;
