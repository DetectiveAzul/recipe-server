import express from 'express';

const app = express();
const port = 3001;

app.use(express.static('public'));

app.get('/', function (req, res) {

});

const server = app.listen(port, function() {
  console.log('Listening on port: ', port);
});
