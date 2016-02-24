"use strict";

module.exports = function(options, callback) {
    if (window.attachEvent) {
        window.attachEvent('on' + options.eventName, function() {
            executeCallbackDeferred();
        });
    } else if (window.addEventListener) {
        window.addEventListener(options.eventName, function() {
            executeCallbackDeferred();
        }, true);
    }

    var id;
    function executeCallbackDeferred() {
        clearTimeout(id);
        id = setTimeout(callback, options.timeoutValue);
    }
};