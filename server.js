const Koa = require('koa');
//Midleware
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

//Routers
const indexRouter = require('./routers/indexRouter.js');

//Initialization
const app = new Koa();
const PORT = process.env.PORT || 3001 ;

// Cors and Bodyparser (for API management)
app.use(cors());
app.use(bodyParser());

//Routers
app.use(indexRouter.routes());


//Server starts
const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
