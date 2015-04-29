'use strict';
var exec = require('child_process').exec;

function Controller() {
    var recievedMessage;
    var child = exec('./echo.sh', function(error, stdout, stderr) {
        console.log('Terminating car control command.');
        console.log('  stdout: ' + stdout);
        console.log('  stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
    child.stdout.on('data', function(data) {
        recievedMessage = data;
        
        console.log('car control command response: ' + recievedMessage);
    });
    child.stderr.on('data', function(data) {
        console.log('car control command response: ' + data);
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