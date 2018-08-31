// Connect to the database
const db = require('../databaseConnection.js');

// GET ALL RECIPES
const getAll = () => {
  return db.any('SELECT * FROM recipes');
};

//Advanced Getters
const getAllStepsFromRecipe = (recipeId) => {
  const id = recipeId;
  return db.any('SELECT * FROM steps WHERE recipeid = $1 ORDER BY stepnumber', id)
};

const getAllIngredientsFromRecipe = (recipeId) => {
  const id = recipeId;
  return db.any('SELECT ingredients.* FROM ingredients ' +
  'INNER JOIN quantities ' +
  'ON quantities.ingredientid = ingredients.id ' +
  'WHERE quantities.recipeid = $1', id);
};

const getAllQuantitiesFromRecipe = (recipeId) => {
  const id = recipeId;
  return db.any('SELECT quantities.id, quantities.ingredientquantity FROM quantities ' +
  'WHERE quantities.recipeid = $1', id);
};

const getAllMeasurementsFromRecipe = (recipeId) => {
  const id = recipeId;
  return db.any('SELECT measurements.* FROM measurements ' +
  'INNER JOIN quantities ' +
  'ON quantities.measurementid = measurements.id ' +
  'WHERE quantities.recipeid = $1', id);
};


// GET SINGLE RECIPE
const getOne = (oldId) => {
  const id = parseInt(oldId);
  return db.one('SELECT * FROM recipes WHERE id = $1', id);
};

// ADD NEW RECIPE
const addOne = (body) => {
  return db.one('INSERT INTO recipes(name, description, preptime, cooktime) ' +
  'VALUES (${name}, ${description}, ${preptime}, ${cooktime}) RETURNING id', body);
};

// EDIT ONE RECIPE
const updateOne = (oldId, body) => {
  return db.one('UPDATE recipes SET name=$1, description=$2, preptime=$3, cooktime=$4 WHERE id=$5 RETURNING id',
    [body.name, body.description, body.preptime, body.cooktime, parseInt(oldId)]);
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
