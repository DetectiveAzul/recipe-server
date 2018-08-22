const Router = require('koa-router');
const router = new Router();

const recipesRouter = require('./dbRouters/recipesRouter.js');
const ingredientsRouter = require('./dbRouters/ingredientsRouter.js');
const measurementsRouter = require('./dbRouters/measurementsRouter.js');
const quantitiesRouter = require('./dbRouters/quantitiesRouter.js');
const stepsRouter = require('./dbRouters/stepsRouter.js');

router.get('/', async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'hello, world!'
  };
});

router.use(recipesRouter.routes());
router.use(ingredientsRouter.routes());
router.use(measurementsRouter.routes());
router.use(quantitiesRouter.routes());
router.use(stepsRouter.routes());

module.exports = router;
