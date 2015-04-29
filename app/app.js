'use strict';
var express    = require('express');
var https       = require('https');
var bodyParser = require('body-parser');
var handlers   = require('./handlers');
var fs = require('fs');
var path = require('path');

var app    = express();
var router = express.Router();
var cert = path.join(__dirname, "cert.pem");
var key = path.join(__dirname, "key.pem");
var securedServer = https.createServer({
    key : fs.readFileSync(key, 'utf8'),
    cert : fs.readFileSync(cert, 'utf8')
}, app);
securedServer.listen(8888);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.use(function(req, res, next) {
  // log all incoming requests
  console.log('-- %s %s from %s', req.method, req.path, req.ip);
  next();
});

router.route('/').get(handlers.rootHandler);
router.route('/:carId/voice').post(handlers.voiceCommand);
router.route('/:carId/:command').all(handlers.carController);
router.route('/:command').all(handlers.carController);

app.all('*', router);
