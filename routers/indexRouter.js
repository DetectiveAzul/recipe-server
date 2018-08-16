const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'hello, world!'
  };
})

module.exports = router;


// const express = require('express');
// const router = express.Router();
//
// //Routers
// const recipesRouter = require('./dbRouters/recipesRouter.js');
// const ingredientsRouter = require('./dbRouters/ingredientsRouter.js');
// const measurementsRouter = require('./dbRouters/measurementsRouter.js');
// const quantitiesRouter = require('./dbRouters/quantitiesRouter.js');
// const stepsRouter = require('./dbRouters/stepsRouter.js');
//
// router.use('/api/recipes/', recipesRouter);
// router.use('/api/ingredients/', ingredientsRouter);
// router.use('/api/measurements/', measurementsRouter);
// router.use('/api/quantities/', quantitiesRouter);
// router.use('/api/steps/', stepsRouter);
//
//
// module.exports = router;
