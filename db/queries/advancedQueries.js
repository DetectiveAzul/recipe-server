const recipesQueries = require('./recipesQueries.js');
const ingredientsQueries = require('./ingredientsQueries.js');
const measurementsQueries = require('./measurementsqueries.js');
const quantitiesQueries = require('./quantitiesqueries.js');
const stepsQueries = require('./stepsQueries.js');

//ADVANCED QUERY
const addFullRecipe = async (recipe) => {
  const recipeId = await recipesQueries.addOne(recipe.info);

  const ingredientsIDs = []
  const measurementsIDs = []
  const quantities = []

  recipe.ingredients.forEach((ingredient) => {
    ingredientsIDs.push(ingredientsQueries.addOne({name: ingredient.ingredient}));
    measurementsIDs.push(measurementsQueries.addOne({name: ingredient.measurement}));
    quantities.push(ingredient.quantity);
  });

  quantities.forEach((quantity, index) => {
    const newQuantity = {
      recipeId: recipeId.id,
      ingredientId: ingredientsIDs[index].id,
      measurementId: measurementsIDs[index].id,
      ingredientQuantity: quantity
    };
    quantitiesQueries.addOne(newQuantity);
  });

  recipe.steps.forEach((step) => {
    const newStep = {
      recipeId: recipeId.id,
      stepNumber: step.stepNumber,
      stepDescription: step.stepDescription
    };
    stepsQueries.addOne(newStep);
  });
  console.log(recipeId);
  return recipeId;
};

module.exports = {
  addFullRecipe: addFullRecipe
};
