// Connect to the database
const db = require('../databaseConnection.js');

// GET ALL RECIPES
const getAll = () => {
  return db.any('SELECT * FROM steps');
};

// GET SINGLE RECIPE
const getOne = (oldId) => {
  const id = parseInt(oldId);
  return db.one('SELECT * FROM steps WHERE id = $1', id);
};

// ADD NEW RECIPE
const addOne = (body) => {
  return db.one('INSERT INTO steps(recipe_id, step_number, step_description) ' +
  'VALUES (${recipe_id}, ${step_number}, ${step_description}) '
  + 'RETURNING id', body);
};

// EDIT ONE RECIPE
const updateOne = (oldId, body) => {
  return db.one('UPDATE steps SET recipe_id=$1, step_number=$2, step_description=$3 WHERE id=$4 '
  + 'RETURNING id',
    [body.recipe_id, body.step_number, body.step_description, parseInt(oldId)]);
};

// DELETE ONE RECIPE
const deleteOne = (oldId) => {
  const id = parseInt(oldId);
  return db.result('DELETE FROM steps WHERE id = $1', id);
};

// DELETE ALL RECIPES
const deleteAll = () => {
  return db.result('DELETE FROM steps');
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
