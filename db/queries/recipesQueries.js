// Connect to the database
const db = require('../databaseConnection.js');

// GET ALL RECIPES
const getAll = () => {
  return db.any('SELECT * FROM recipes');
};

const getAllStepsFromRecipe = (recipeId) => {
  const id = recipeId;
  return db.any('SELECT * FROM steps WHERE recipeid = $1 ORDER BY stepnumber', id)
};

// GET SINGLE RECIPE
const getOne = (oldId) => {
  const id = parseInt(oldId);
  return db.one('SELECT * FROM recipes WHERE id = $1', id);
};

// ADD NEW RECIPE
const addOne = (body) => {
  return db.one('INSERT INTO recipes(name, description) ' +
  'VALUES (${name}, ${description}) RETURNING id', body);
};

// EDIT ONE RECIPE
const updateOne = (oldId, body) => {
  return db.one('UPDATE recipes SET name=$1, description=$2 WHERE id=$3 RETURNING id',
    [body.name, body.description, parseInt(oldId)]);
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
    getOne: getOne,
    addOne: addOne,
    updateOne: updateOne,
    deleteOne: deleteOne,
    deleteAll: deleteAll
}
