// Connect to the database
const db = require('../databaseConnection.js');

// GET ALL RECIPES
const getAll = (req, res, next) => {
  db.any('SELECT * FROM quantities')
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: `Retrieved ${data.length} Quantities`
        });
    })
    .catch((err) => {
      return next(err);
    });
};

// GET SINGLE RECIPE
const getOne = (req, res, next) => {
  const id = parseInt(req.params.id);
  db.one('SELECT * FROM quantities WHERE id = $1', id)
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: `Retrieved ${data.length} Quantity`
        });
    })
    .catch((err) => {
      return next(err);
    });
};

// ADD NEW RECIPE
const addOne = (req, res, next) => {
  db.one('INSERT INTO quantities(name) ' +
  'VALUES (${recipe_id}, ${ingredient_id}, ${measurement_id}, ${ingredient_quantity}) RETURNING id', req.body.payload)
    .then((result) => {
      res.status(200)
        .json({
          status: 'success',
          id: parseInt(result.id),
          message: `Inserted Quantity id ${result.id}`
        });
    })
    .catch((err) => {
      return next(err);
    });
};

// EDIT ONE RECIPE
const updateOne = (req, res, next) => {
  db.none('UPDATE quantities SET recipe_id=$1, ingredient_id=$2, measurement_id=$3 '
    + 'ingredient_quantity=$4 WHERE id=$5',
    [
      parseInt(req.params.recipe_id), 
      parseInt(req.params.ingredient_id),
      parseInt(req.params.measurement_id),
      parseInt(req.params.ingredients_quantity),
      parseInt(req.params.id)
    ])
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: `Updated Quantity id ${req.params.id}`
        });
    })
    .catch((err) => {
      return next(err);
    });
};

// DELETE ONE RECIPE
const deleteOne = (req, res, next) => {
  const id = parseInt(req.params.id);
    db.result('DELETE FROM quantities WHERE id = $1', id)
      .then((result) => {
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} Quantity`
          });
      })
      .catch((err) => {
        return next(err);
      });
};

// DELETE ALL RECIPES
const deleteAll = (req, res, next) => {
    db.result('DELETE FROM quantities')
      .then((result) => {
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} Quantities`
          });
      })
      .catch((err) => {
        return next(err);
      });
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
