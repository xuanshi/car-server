'use strict';
var express    = require('express');
var http       = require('http');
var bodyParser = require('body-parser');
var handlers   = require('./handlers');

var app    = express();
var router = express.Router();
var server = app.listen(8080,  function() {
  console.log('Listening on port %d', server.address().port);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.use(function(req, res, next) {
  // log all incoming requests
  console.log('-- %s %s from %s', req.method, req.path, req.ip);
  next();
});

router.route('/').get(handlers.rootHandler);
router.route('/:carId/:command').all(handlers.carController);

app.all('*', router);
