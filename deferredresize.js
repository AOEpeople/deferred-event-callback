"use strict";

module.exports = function(timeoutValue, callback) {
    if (window.attachEvent) {
        window.attachEvent('onresize', function() {
            executeCallbackDeferred();
        });
    } else if (window.addEventListener) {
        window.addEventListener('resize', function() {
            executeCallbackDeferred();
        }, true);
    }

    var id;
    function executeCallbackDeferred() {
        clearTimeout(id);
        id = setTimeout(callback, timeoutValue);
    }
}

