"use strict";

module.exports = function(options, callback) {
    if (!options.eventName) throw new Error('Missing eventName property in options object.');
    if (options.nodes instanceof Array !== true) throw new Error('Missing nodes array with elements to add event listeners.');
    if (options.nodes.length < 1) return;
    if (typeof callback !== 'function') throw new Error('Missing callback function.');

    if (window.attachEvent) {
        options.nodes.forEach(function(node) {
            node.attachEvent('on' + options.eventName, function() {
                executeCallbackDeferred();
            });
        });
    } else if (window.addEventListener) {
        options.nodes.forEach(function(node) {
            node.addEventListener(options.eventName, function() {
                executeCallbackDeferred();
            }, true);
        });
    } else {
        throw new Error('Neither attachEvent nor addEventListener found. Are you using a browser or a dishwasher?');
    }

    var id;
    function executeCallbackDeferred() {
        clearTimeout(id);
        id = setTimeout(callback, options.timeoutValue || 300);
    }
};