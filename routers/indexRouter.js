const express = require('express');
const router = express.Router();
const pg = require('pg');
const config = require('../db/config.js');



// MongoClient.connect(``, (err, client) => {
//   console.log('Connected to DB');
//   const db = client.db('chess');
//   const gamesCollection = db.collection('games');
//   const playersCollection = db.collection('players');
//   router.use('/games/', gamesRouter(gamesCollection));
//   router.use('/players/', playersRouter(playersCollection));
//
// });

module.exports = router;
