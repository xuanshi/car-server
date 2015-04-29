'use strict';
var http = require('http');
var path = require('path');
var CarController = require('./carController');

var carController = new CarController();

/**
 * routing
 */
exports.rootHandler = function(req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
};

exports.carController = function(req, res) {
	console.log(req.params);
	var command = req.params.command;
    var carId = req.params.carId;
	var value = req.query.value;
	var callback = carController.handle(carId, command, value);
    respond(req, res, callback);
};

function respond(req, res, callback) {
	setTimeout(function(){
	    res.header('Access-Control-Allow-Origin','*');
        res.json(callback());
    }, 500);
}

exports.voiceCommand = function(req, res, next) {
    var voiceCommand = JSON.stringify(req.body).toLowerCase();
    console.log(voiceCommand);
    var message;
    if (voiceCommand.indexOf('go') != -1) {
        message = "Moving!";
        carController.handle(req.query.carId, 'set-speed', 50);
    } else if (voiceCommand.indexOf('stop') != -1) {
        message = "Stopping!";
        carController.handle(req.query.carId, 'set-speed', 0);
    } else {
        message = "No change!";
    }
    res.status(201).send("received voice command: " + voiceCommand + ", result: " + message);
};