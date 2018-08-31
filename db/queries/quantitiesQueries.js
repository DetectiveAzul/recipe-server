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
  return db.one('INSERT INTO quantities(recipe_id, ingredient_id, measurement_id, ingredient_quantity) ' +
  'VALUES (${recipe_id}, ${ingredient_id}, ${measurement_id}, ${ingredient_quantity}) '
  + 'RETURNING id', body);
};

// EDIT ONE RECIPE
const updateOne = (oldId, body) => {
  return db.one('UPDATE quantities SET recipe_id=$1, ingredient_id=$2, measurement_id=$3, '
  + 'ingredient_quantity=$4 WHERE id=$5 '
  + 'RETURNING id',
    [body.recipe_id, body.ingredient_id, body.measurement_id,
      body.ingredient_quantity, parseInt(oldId)]);
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
