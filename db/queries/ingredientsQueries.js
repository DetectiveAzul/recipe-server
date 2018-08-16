// Connect to the database
const db = require('../databaseConnection.js');

// GET ALL RECIPES
const getAll = () => {
  return db.any('SELECT * FROM ingredients');
};

// GET SINGLE RECIPE
const getOne = (oldId) => {
  const id = parseInt(oldId);
  return db.one('SELECT * FROM ingredients WHERE id = $1', id);
};

// ADD NEW RECIPE
const addOne = (body) => {
  return db.one('INSERT INTO ingredients(name) ' +
  'VALUES (${name}) RETURNING id', body);
};

// EDIT ONE RECIPE
const updateOne = (oldId, body) => {
  return db.one('UPDATE ingredients SET name=$1 WHERE id=$2 RETURNING id',
    [body.name, parseInt(oldId)]);
};

// DELETE ONE RECIPE
const deleteOne = (oldId) => {
  const id = parseInt(oldId);
  return db.result('DELETE FROM ingredients WHERE id = $1', id);
};

// DELETE ALL RECIPES
const deleteAll = () => {
  return db.result('DELETE FROM ingredients');
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
