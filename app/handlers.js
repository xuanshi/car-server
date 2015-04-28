'use strict';
var http = require('http');
var CarController = require('./carController');

var carController = new CarController();

/**
 * routing
 */
exports.rootHandler = function(req, res) {
	res.writeHead(200, {
		'Content-Type' : 'text/plain'
	});
	res.end('Enjoy controlling cars!');
};

exports.carController = function(req, res) {
	console.log(req.params);
	var carId = req.params.carId;
	var command = req.params.command;
	var value = req.query.value;
	var result = carController.handle(carId, command, value);
	res.json(result);
};