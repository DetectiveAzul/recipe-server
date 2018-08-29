const recipesQueries = require('./recipesQueries.js');
const ingredientsQueries = require('./ingredientsQueries.js');
const measurementsQueries = require('./measurementsqueries.js');
const quantitiesQueries = require('./quantitiesqueries.js');
const stepsQueries = require('./stepsQueries.js');

//ADVANCED QUERY
const addFullRecipe = (recipe) => {
  const recipeId = recipesQueries.addOne(recipe.info);

  const ingedientIDs = []
  const measurementIDs = []
  const quantities = []

  recipe.ingredients.forEach((ingredient) => {
    ingredientIDs.push(ingredientsQueries.addOne({name: ingredient.ingredient}));
    measurementIDs.push(measurementQueries.addOne({name: ingredient.measurement}));
    quantities.push(ingredient.quantity);
  });

  quantities.forEach((quantity, index) => {
    const newQuantity = {
      recipeId: recipeId.id,
      ingredientId: ingredientsIDs[index].id,
      measurementId: measurementIDs[index].id,
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

  return recipeId;
};

module.exports = {
  addFullRecipe: addFullRecipe
};
