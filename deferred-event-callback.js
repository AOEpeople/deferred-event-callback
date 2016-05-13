"use strict";

var deferredCallback = function(options, callback, returnObj) {
    if (typeof options  !== 'object')   throw new Error('First argument needs to be an (configuration) object.');
    if (typeof callback !== 'function') throw new Error('Second argument needs to be a (callback) function.');

    if (options.eventNames instanceof Array !== true) throw new Error('Missing eventNames Array in configuration object.');
    if (options.eventNames.length < 1) return;
    if (options.nodes instanceof Array !== true) throw new Error('Missing nodes Array in configuration object.');
    if (options.nodes.length < 1) return;

    if (!returnObj) returnObj = {};

    if (options.jquery) {
        options.nodes.forEach(function(node) {
            options.eventNames.forEach(function(eventName) {
                options.jquery(node).on(eventName, function() {
                    executeCallbackDeferred(node);
                });
            });
        });
    } else if (window.attachEvent) {
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

    function executeCallbackDeferred(node) {
        clearTimeout(returnObj.id);
        returnObj.id = setTimeout(function() { callback(node) }, options.timeoutValue || 300);
    }
};

deferredCallback.abort = function(returnObj) {
    clearTimeout(returnObj.id);
};

module.exports = deferredCallback;