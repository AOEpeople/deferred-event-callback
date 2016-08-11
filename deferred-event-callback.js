"use strict";

var DeferredCallback = function(options) {
    if (!(this instanceof DeferredCallback)) return new DeferredCallback(options);

    if (typeof options !== 'object') throw new Error('First argument needs to be an (configuration) object.');
    if (typeof options.callback !== 'function') throw new Error('Options argument needs to be have a (callback) property with a function.');
    if (options.eventNames instanceof Array !== true) throw new Error('Missing eventNames Array in configuration object.');
    if (options.eventNames.length < 1) return;
    if (options.nodes instanceof Array !== true) throw new Error('Missing nodes Array in configuration object.');
    if (options.nodes.length < 1) return;

    var timeoutId;

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
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function() { options.callback(node) }, options.timeoutValue || 300);
    }

    this.abort = function() {
        clearTimeout(timeoutId);
    }
};

module.exports = DeferredCallback;