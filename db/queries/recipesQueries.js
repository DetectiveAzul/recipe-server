// Connect to the database
const db = require('../databaseConnection.js');

// GET ALL RECIPES
const getAll = () => {
  return db.any('SELECT * FROM recipes');
};

//Advanced Getters
const getAllStepsFromRecipe = (recipeId) => {
  const id = recipeId;
  return db.any('SELECT * FROM steps WHERE recipe_id = $1 ORDER BY step_number', id)
};

const getAllIngredientsFromRecipe = (recipe_id) => {
  const id = recipe_id;
  return db.any('SELECT ingredients.* FROM ingredients ' +
  'INNER JOIN quantities ' +
  'ON quantities.ingredient_id = ingredients.id ' +
  'WHERE quantities.recipe_id = $1', id);
};

const getAllQuantitiesFromRecipe = (recipe_id) => {
  const id = recipe_id;
  return db.any('SELECT quantities.id, quantities.ingredient_quantity FROM quantities ' +
  'WHERE quantities.recipe_id = $1', id);
};

const getAllMeasurementsFromRecipe = (recipe_id) => {
  const id = recipe_id;
  return db.any('SELECT measurements.* FROM measurements ' +
  'INNER JOIN quantities ' +
  'ON quantities.measurement_id = measurements.id ' +
  'WHERE quantities.recipe_id = $1', id);
};


// GET SINGLE RECIPE
const getOne = (oldId) => {
  const id = parseInt(oldId);
  return db.one('SELECT * FROM recipes WHERE id = $1', id);
};

// ADD NEW RECIPE
const addOne = (body) => {
  return db.one('INSERT INTO recipes(name, description, prep_time, cook_time) ' +
  'VALUES (${name}, ${description}, ${prep_time}, ${cook_time}) RETURNING id', body);
};

// EDIT ONE RECIPE
const updateOne = (oldId, body) => {
return db.one('UPDATE recipes SET name=$1, description=$2, prep_time=$3, cook_time=$4 WHERE id=$5 RETURNING id',
    [body.name, body.description, body.prep_time, body.cook_time, parseInt(oldId)]);
};

// DELETE ONE RECIPE
const deleteOne = (oldId) => {
  const id = parseInt(oldId);
  return db.result('DELETE FROM recipes WHERE id = $1', id);
};

// DELETE ALL RECIPES
const deleteAll = () => {
  return db.result('DELETE FROM recipes');
};

// exporting query functions
module.exports = {
    getAll: getAll,
    getAllSteps: getAllStepsFromRecipe,
    getAllIngredients: getAllIngredientsFromRecipe,
    getAllQuantities: getAllQuantitiesFromRecipe,
    getAllMeasurements: getAllMeasurementsFromRecipe,
    getOne: getOne,
    addOne: addOne,
    updateOne: updateOne,
    deleteOne: deleteOne,
    deleteAll: deleteAll
}
