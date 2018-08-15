const express = require('express');
const router = express.Router();

//Routers
const recipesRouter = require('./dbRouters/recipesRouter.js');
const ingredientsRouter = require('./dbRouters/ingredientsRouter.js');

// router.use('/users/', userRouter);
router.use('/api/recipes/', recipesRouter);
router.use('/api/ingredients/', ingredientsRouter);

router.get('/', (res, req) => {
  console.log('User entered main index');
});

module.exports = router;
