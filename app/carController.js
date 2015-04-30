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
    });
    child.stderr.on('data', function(data) {
        console.log('stderr -- ' + data);
        var start = data.indexOf('**') + 2;
        var end = data.lastIndexOf('**');
        recievedMessage = {};
        try {
            recievedMessage.status = "success";
            recievedMessage.data = JSON.parse(data.substring(start, end));
        } catch (e) {
            recievedMessage.status = "fail";
        }
    });
    child.on('close', function(code) {
        console.log('closing car control command: ' + code);
    });
    
    process.on('exit', function() {
        if (child) {
            child.kill('SIGKILL');
        }
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
    console.log('sent command', toSend);
    return this.getRetMessage;
}

module.exports = Controller;