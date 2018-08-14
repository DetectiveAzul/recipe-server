const express = require('express');
const router = express.Router();
const pg = require('pg');
const config = require('../db/config.js');
//Routers
const recipesRouter = require('./recipesRouter.js');
const ingredientsRouter = require('./ingredientsRouter.js');

// router.use('/users/', userRouter);
router.use('/api/recipes/', recipesRouter);
router.use('/api/ingredients/', ingredientsRouter);

router.get('/', (res, req) => {
  console.log('User entered main index');
});

module.exports = router;
