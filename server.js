const Koa = require('koa');
//Midleware
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
//Auth0 middleware
const jwt = require('koa-jwt');
const jwks = require('jwks-rsa');
//Routers
const indexRouter = require('./routers/indexRouter.js');

//Initialization
const app = new Koa();
const PORT = process.env.PORT || 3001 ;

// Cors and Bodyparser (for API management)
app.use(cors());
app.use(bodyParser());

// Auth0

const authCheck = jwt({
  secret: jwks.koaJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 2,
    // YOUR-AUTH0-DOMAIN name
    jwksUri: "https://{YOUR-AUTH0-DOMAIN}/.well-known/jwks.json"
  }),
  // Identifier we set when we created the API
  audience: '{YOUR-API-AUDIENCE-ATTRIBUTE}',
  issuer: '{YOUR-AUTH0-DOMAIN}',
  algorithms: [ 'RS256' ]
});


//Routers
app.use(indexRouter.routes());


//Server starts
const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
