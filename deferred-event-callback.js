"use strict";

module.exports = function(options, callback) {
    if (options.eventNames instanceof Array !== true) throw new Error('Missing eventNames array.');
    if (options.eventNames.length < 1) return;
    if (options.nodes instanceof Array !== true) throw new Error('Missing nodes array with elements to add event listeners.');
    if (options.nodes.length < 1) return;
    if (typeof callback !== 'function') throw new Error('Missing callback function.');

    if (window.attachEvent) {
        options.nodes.forEach(function(node) {
            options.eventNames.forEach(function(eventName) {
                node.attachEvent('on' + eventName, function() {
                    executeCallbackDeferred(node);
                });
            });
        });
    } else if (window.addEventListener) {
        options.nodes.forEach(function(node) {
            options.eventNames.forEach(function(eventName) {
                node.addEventListener(eventName, function() {
                    executeCallbackDeferred(node);
                }, true);
            });
        });
    } else {
        throw new Error('Neither attachEvent nor addEventListener found. Are you using a browser or a dishwasher?');
    }

    var id;
    function executeCallbackDeferred(node) {
        clearTimeout(id);
        id = setTimeout(function() { callback(node) }, options.timeoutValue || 300);
    }
};