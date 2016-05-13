var lib = require('../../deferred-event-callback');
var $ = require('jquery');
var node;

afterEach(function() {
    node = undefined;
});

beforeEach(function() {
    node = document.createElement('input');
});

it('should call the callback after a default delay of 300ms if event(s) get triggered', function(done) {
    var callback = jasmine.createSpy('callback');

    lib({eventNames: ['keyup'], nodes: [node], jquery: $}, callback);

    $(node).trigger('keyup');

    setTimeout(function() {
        expect(callback).not.toHaveBeenCalled();
    }, 299);

    setTimeout(function() {
        expect(callback).toHaveBeenCalled();
        done();
    }, 300);
});

it('should call the callback after a delay of options.timeoutValue if event(s) get triggered', function(done) {
    var callback = jasmine.createSpy('callback');

    lib({eventNames: ['keypress', 'keyup'], nodes: [node, node, node], jquery: $, timeoutValue: 100}, callback);

    $(node).trigger('keypress');

    setTimeout(function() {
        expect(callback).not.toHaveBeenCalled();
    }, 99);

    setTimeout(function() {
        expect(callback).toHaveBeenCalled();
        done();
    }, 100);
});

it('should call the callback once', function(done) {
    var callback = jasmine.createSpy('callback');

    lib({eventNames: ['keypress', 'keyup'], nodes: [node, node, node], jquery: $, timeoutValue: 100}, callback);

    $(node).trigger('keyup');

    setTimeout(function() {
        expect(callback.calls.count()).toBe(1);
        done();
    }, 100);
});

it('callback should get the node passed', function(done) {
    var callback = jasmine.createSpy('callback');

    lib({eventNames: ['keypress', 'keyup'], nodes: [node, node, node], jquery: $, timeoutValue: 100}, callback);

    $(node).trigger('keyup');

    setTimeout(function() {
        expect(callback).toHaveBeenCalledWith(node);
        done();
    }, 100);
});

it('callback should get aborted', function(done) {
    var callback = jasmine.createSpy('callback');

    var returnObj = {};
    lib({eventNames: ['keypress', 'keyup'], nodes: [node, node, node], jquery: $, timeoutValue: 50}, callback, returnObj);

    $(node).trigger('keyup');

    lib.abort(returnObj);

    setTimeout(function() {
        expect(callback).not.toHaveBeenCalled();
        done();
    }, 100);
});