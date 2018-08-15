// Connect to the database
const db = require('../databaseConnection.js');

// GET ALL RECIPES
const getAll = (req, res, next) => {
  db.any('SELECT * FROM measurements')
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: `Retrieved ${data.length} Measurements`
        });
    })
    .catch((err) => {
      return next(err);
    });
};

// GET SINGLE RECIPE
const getOne = (req, res, next) => {
  const id = parseInt(req.params.id);
  db.one('SELECT * FROM measurements WHERE id = $1', id)
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: `Retrieved ${data.length} Measurement`
        });
    })
    .catch((err) => {
      return next(err);
    });
};

// ADD NEW RECIPE
const addOne = (req, res, next) => {
  db.one('INSERT INTO measurements(name) ' +
  'VALUES (${name}) RETURNING id', req.body.payload)
    .then((result) => {
      res.status(200)
        .json({
          status: 'success',
          id: parseInt(result.id),
          message: `Inserted Measurement id ${result.id}`
        });
    })
    .catch((err) => {
      return next(err);
    });
};

// EDIT ONE RECIPE
const updateOne = (req, res, next) => {
  db.none('UPDATE measurements SET name=$1 WHERE id=$3',
    [req.body.name, parseInt(req.params.id)])
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: `Updated Measurement id ${req.params.id}`
        });
    })
    .catch((err) => {
      return next(err);
    });
};

// DELETE ONE RECIPE
const deleteOne = (req, res, next) => {
  const id = parseInt(req.params.id);
    db.result('DELETE FROM measurements WHERE id = $1', id)
      .then((result) => {
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} Measurement`
          });
      })
      .catch((err) => {
        return next(err);
      });
};

// DELETE ALL RECIPES
const deleteAll = (req, res, next) => {
    db.result('DELETE FROM measurements')
      .then((result) => {
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} Measurements`
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
