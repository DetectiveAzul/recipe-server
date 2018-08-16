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
  db.one('INSERT INTO quantities(recipeId, ingredientId, measurementId, ingredientQuantity) ' +
  'VALUES (${recipeId}, ${ingredientId}, ${measurementId}, ${ingredientQuantity}) '
  + 'RETURNING id', req.body)
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
  db.none('UPDATE quantities SET recipeId=$1, ingredientId=$2, measurementId=$3, ingredientQuantity=$4 WHERE id=$5',
    [req.body.recipeId, req.body.ingredientId, req.body.measurementId, req.body.ingredientQuantity, parseInt(req.params.id)])
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