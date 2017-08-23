var express = require('express');
var bodyParser = require('body-parser');
var calc = require('./incomeTaxCalc.js');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/calc', function(req, res) {
  var income = req.body.income;
  res.json(calc.incomeTaxCalc(income));
});

var port = 8000;

app.listen(port, function() {
  console.log('Listening on', port);
});
