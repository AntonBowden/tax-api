var express = require('express');
var bodyParser = require('body-parser');
var calc = require('./incomeTaxCalc.js');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/calc', function(req, res) {
  var income = req.body.income;
  res.json(calc(income));
});


app.use(function(err, req, res, next) {
  if (err) {
    console.log(err.message);
    res.status(500).send(err);
  }
});


var port = 8000;

app.listen(port, function() {
  console.log('Listening on', port);
});

module.exports = app;
