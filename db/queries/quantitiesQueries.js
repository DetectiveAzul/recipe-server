// Connect to the database
const db = require('../databaseConnection.js');

// GET ALL RECIPES
const getAll = () => {
  return db.any('SELECT * FROM quantities');
};

// GET SINGLE RECIPE
const getOne = (oldId) => {
  const id = parseInt(oldId);
  return db.one('SELECT * FROM quantities WHERE id = $1', id);
};

// ADD NEW RECIPE
const addOne = (body) => {
  return db.one('INSERT INTO quantities(recipeId, ingredientId, measurementId, ingredientQuantity) ' +
  'VALUES (${recipeId}, ${ingredientId}, ${measurementId}, ${ingredientQuantity}) '
  + 'RETURNING id', body);
};

// EDIT ONE RECIPE
const updateOne = (oldId, body) => {
  return db.one('UPDATE quantities SET recipeId=$1, ingredientId=$2, measurementId=$3, '
  + 'ingredientQuantity=$4 WHERE id=$5 '
  + 'RETURNING id',
    [body.recipeId, body.ingredientId, body.measurementId,
      body.ingredientQuantity, parseInt(oldId)]);
};

// DELETE ONE RECIPE
const deleteOne = (oldId) => {
  const id = parseInt(oldId);
  return db.result('DELETE FROM quantities WHERE id = $1', id);
};

// DELETE ALL RECIPES
const deleteAll = () => {
  return db.result('DELETE FROM quantities');
};

// exporting query functions
module.exports = {
    getAll: getAll,
    getOne: getOne,
    addOne: addOne,
    updateOne: updateOne,
    deleteOne: deleteOne,
    deleteAll: deleteAll,
}
