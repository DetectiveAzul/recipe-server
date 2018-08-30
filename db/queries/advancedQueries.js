const recipesQueries = require('./recipesQueries.js');
const ingredientsQueries = require('./ingredientsQueries.js');
const measurementsQueries = require('./measurementsqueries.js');
const quantitiesQueries = require('./quantitiesQueries.js');
const stepsQueries = require('./stepsQueries.js');

//ADVANCED QUERY
const addFullRecipe = async (recipe) => {
  //Add the recipe info
  const recipeId = await recipesQueries.addOne(recipe.info);

  //Split the ingredient key and add them to their specifics psql tables
  recipe.ingredients.forEach(async (ingredient) => {

    newQuantity = {
      recipeId: recipeId.id,
      ingredientId: (await ingredientsQueries.addOne({name: ingredient.ingredient})).id,
      measurementId: (await measurementsQueries.addOne({name: ingredient.measurement})).id,
      ingredientQuantity: ingredient.quantity
    }

    await quantitiesQueries.addOne(newQuantity)

  });

  //Add the step sections
  recipe.steps.forEach((step) => {
    const newStep = {
      recipeId: recipeId.id,
      stepNumber: step.stepNumber,
      stepDescription: step.stepDescription
    };
    stepsQueries.addOne(newStep);
  });

  //Return the recipe ID for the router to display the info
  return recipeId;
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
