const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const indexRouter = require('./routers/indexRouter.js');
const cors = require('@koa/cors');

const app = new Koa();

const PORT = process.env.PORT || 3001 ;

app.use(cors());
app.use(bodyParser());
app.use(indexRouter.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
