const Router = require('koa-router');
const router = new Router();
//queries
const queries = require('../../db/queries/recipesQueries.js');
const advancedQueries = require('../../db/queries/advancedQueries.js');

const BASE_URL = `/api/recipes`;


//INDEX
router.get(`${BASE_URL}`, async (ctx) => {
  try {
    const data = await queries.getAll();
    if (data.length) {
      ctx.body = {
        status: 'success',
        data: data
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'No entries were found'
      }
    }

  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
})

// SHOW RANDOM
router.get(`${BASE_URL}/random`, async (ctx) => {
  try{
    const data = await queries.getOneRandom();
    ctx.body = {
      status: 'Random recipe success',
      data: data
    }
  } catch(err){
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
  }
});

//SHOW
router.get(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const data = await queries.getOne(ctx.params.id);
    const ingredients = await queries.getAllIngredients(ctx.params.id);
    const quantities = await queries.getAllQuantities(ctx.params.id);
    const steps = await queries.getAllSteps(ctx.params.id);
    const measurements = await queries.getAllMeasurements(ctx.params.id);
    const recipe = {
      info: data,
      ingredients: ingredients,
      quantities: quantities,
      measurements: measurements,
      steps: steps
    };
    ctx.body = {
      status: 'success',
      data: recipe
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

//CREATE
router.post(`${BASE_URL}`, async (ctx) => {
  try {
    const dataId = await queries.addOne(ctx.request.body);
    const data = await queries.getOne(dataId.id);
    ctx.status = 201;
    ctx.body = {
      status: 'success',
      new_entry: data
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

router.post(`${BASE_URL}/full`, async (ctx) => {
  try {
    const dataId = await advancedQueries.addFullRecipe(ctx.request.body);
    const data = await queries.getOne(dataId.id);
    ctx.status = 201;
    ctx.body = {
      status: 'success',
      new_entry: data
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has ocurred.'
    };
  }
});

//UPDATE
router.put(`${BASE_URL}/:id`, async (ctx) => {
  try {
    await queries.updateOne(ctx.params.id, ctx.request.body);
    const data = await queries.getOne(ctx.params.id);
    ctx.body = {
      status: 'success',
      updated_entry: data
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

router.put(`${BASE_URL}/:id/full`, async (ctx) => {
  try {
    await advancedQueries.updateFullRecipe(ctx.params.id, ctx.request.body);
    const data = await queries.getOne(ctx.params.id);
    ctx.body = {
      status: 'success',
      updated_entry: data
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

//DESTROY ALL
router.delete(`${BASE_URL}/`, async (ctx) => {
  try {
    const data = await queries.deleteAll();
    if (data.rowCount) {
      ctx.body = {
        status: 'success',
        message: `${data.rowCount} entries has been deleted`
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'No entry was found'
      }
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

//DESTROY ONE
router.delete(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const data = await queries.deleteOne(ctx.params.id);
    if (data.rowCount) {
      ctx.body = {
        status: 'success',
        message: `Entry id ${ctx.params.id} has been deleted`
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: `No entry was found`
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

module.exports = router;
