const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const port = 3001;

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

//Allow Cross Origin Requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const server = http.listen(port, () => {
  console.log('Example app at', port);
});
