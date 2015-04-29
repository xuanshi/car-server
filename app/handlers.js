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
	var command = req.params.command;
    var carId = req.params.carId;
	var value = req.query.value;
	var callback = carController.handle(carId, command, value);
	setTimeout(function(){
	    res.header('Access-Control-Allow-Origin','*');
        res.json(callback());
    }, 500);
};
