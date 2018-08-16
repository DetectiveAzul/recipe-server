console.log('It works!');
const Koa = require('koa');
const indexRoutes = require('./router/index.js');

const app = new Koa();
const PORT = 1337;

app.use(indexRoutes.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
