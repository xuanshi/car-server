'use strict';
var exec = require('child_process').exec;

function Controller() {
    var recievedMessage;
    var child = exec('./AnkiVehicleController', function(error, stdout, stderr) {
        console.log('Terminating car control command.');
        console.log('  stdout: ' + stdout);
        console.log('  stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
    child.stdout.on('data', function(data) {
        console.log('stdout -- ' + data);
        recievedMessage = {};
        try {
            recievedMessage.status = "success";
            recievedMessage.data = JSON.parse(data);
        } catch (e) {
            recievedMessage.status = "fail";
        }      
    });
    child.stderr.on('data', function(data) {
        console.log('stderr -- ' + data);
    });
    child.on('close', function(code) {
        console.log('closing car control command: ' + code);
    });
    this.child = child;
    this.getRetMessage = function() {
        return recievedMessage;
    }
}

Controller.prototype.handle = function(carId, command, value) {
    var toSend = {
        'carId' : carId,
        'command' : command,
        'value' : value
    }
    this.child.stdin.write(JSON.stringify(toSend) + '\n');
    return this.getRetMessage;
}

module.exports = Controller;