'use strict';

function Controller() {
}

Controller.prototype.handle = function(carId, command, value) {
    var result = {"status": "good"};
    // TODO test command line
    return result;
}

module.exports = Controller;