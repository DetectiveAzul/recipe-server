const recipesQueries = require('./recipesQueries.js');
const ingredientsQueries = require('./ingredientsQueries.js');
const measurementsQueries = require('./measurementsqueries.js');
const quantitiesQueries = require('./quantitiesQueries.js');
const stepsQueries = require('./stepsQueries.js');

//ADVANCED QUERY
const addFullRecipe = async (recipe) => {
  //Add the recipe info
  const recipe_id = await recipesQueries.addOne(recipe.info);

  //Split the ingredient key and add them to their specifics psql tables
  recipe.ingredients.forEach(async (ingredient) => {

    newQuantity = {
      recipe_id: recipe_id.id,
      ingredient_id: (await ingredientsQueries.addOne({name: ingredient.ingredient})).id,
      measurement_id: (await measurementsQueries.addOne({name: ingredient.measurement})).id,
      ingredient_quantity: ingredient.quantity
    }

    await quantitiesQueries.addOne(newQuantity)

  });

  //Add the step sections
  recipe.steps.forEach((step) => {
    const newStep = {
      recipe_id: recipe_id.id,
      step_number: step.step_number,
      step_description: step.step_description
    };
    stepsQueries.addOne(newStep);
  });

  //Return the recipe ID for the router to display the info
  return recipe_id;
};

const updateFullRecipe = async (id, newRecipe) => {
  await recipesQueries.updateOne(id, newRecipe.info);

  newRecipe.ingredients.forEach(async (ingredient) => {
    await ingredientsQueries.updateOne(ingredient.id, ingredient);
  });

  newRecipe.steps.forEach(async (step) => {
    await stepsQueries.updateOne(step.id, step);
  });

  newRecipe.measurements.forEach(async (measurement) => {
    await measurementsQueries.updateOne(measurement.id, measurement);
  });

  newRecipe.quantities.forEach(async (quantity) => {
    await quantitiesQueries.updateOne(quantity.id, quantity);
  });

}

module.exports = {
  addFullRecipe: addFullRecipe,
  updateFullRecipe: updateFullRecipe
};
