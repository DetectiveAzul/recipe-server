const express = require('express');
const router = express.Router();

//Routers
const recipesRouter = require('./dbRouters/recipesRouter.js');
const ingredientsRouter = require('./dbRouters/ingredientsRouter.js');
const measurementsRouter = require('./dbRouters/measurementsRouter.js');
const quantitiesRouter = require('./dbRouters/quantitiesRouter.js');
const stepsRouter = require('./dbRouters/stepsRouter.js');

router.use('/api/recipes/', recipesRouter);
router.use('/api/ingredients/', ingredientsRouter);
router.use('/api/measurements/', measurementsRouter);
router.use('/api/quantities/', quantitiesRouter);
router.use('/api/steps/', stepsRouter);


module.exports = router;
