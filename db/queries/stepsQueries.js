// Connect to the database
const db = require('../databaseConnection.js');

// GET ALL RECIPES
const getAll = (req, res, next) => {
  db.any('SELECT * FROM steps')
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: `Retrieved ${data.length} Steps`
        });
    })
    .catch((err) => {
      return next(err);
    });
};

// GET SINGLE RECIPE
const getOne = (req, res, next) => {
  const id = parseInt(req.params.id);
  db.one('SELECT * FROM steps WHERE id = $1', id)
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: `Retrieved ${data.length} Step`
        });
    })
    .catch((err) => {
      return next(err);
    });
};

// ADD NEW RECIPE
const addOne = (req, res, next) => {
  db.one('INSERT INTO steps(recipe_id, ingredient_id, measurement_id, ingredient_quantity) ' +
  'VALUES (${recipe_id}, ${ingredient_id}, ${measurement_id}, ${ingredient_quantity}) '
  + 'RETURNING id', req.body.payload)
    .then((result) => {
      res.status(200)
        .json({
          status: 'success',
          id: parseInt(result.id),
          message: `Inserted Step id ${result.id}`
        });
    })
    .catch((err) => {
      return next(err);
    });
};

// EDIT ONE RECIPE
const updateOne = (req, res, next) => {
  db.none('UPDATE steps SET recipe_id=$1, ingredient_id=$2, measurement_id=$3, ingredient_quantity=$4 WHERE id=$5',
    [req.body.recipe_id, req.body.ingredient_id, req.body.measurement_id, req.body.ingredient_quantity, parseInt(req.params.id)])
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: `Updated Step id ${req.params.id}`
        });
    })
    .catch((err) => {
      return next(err);
    });

};

// DELETE ONE RECIPE
const deleteOne = (req, res, next) => {
  const id = parseInt(req.params.id);
    db.result('DELETE FROM steps WHERE id = $1', id)
      .then((result) => {
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} Step`
          });
      })
      .catch((err) => {
        return next(err);
      });
};

// DELETE ALL RECIPES
const deleteAll = (req, res, next) => {
    db.result('DELETE FROM steps')
      .then((result) => {
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} Steps`
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
