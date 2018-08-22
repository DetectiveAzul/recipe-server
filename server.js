const Koa = require('koa');
//Midleware
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const session = require('koa-session');
const passport = require('koa-passport');
//Routers
const indexRouter = require('./routers/indexRouter.js');

//Initialization
const app = new Koa();
const PORT = process.env.PORT || 3001 ;

// Cors and Bodyparser (for API management)
app.use(cors());
app.use(bodyParser());

//Sessions
app.keys = ['test-key'];
app.use(session(app));

//Auth
require('./auth');
app.use(passport.initialize());
app.use(passport.session());

//Routers
app.use(indexRouter.routes());


//Server starts
const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
