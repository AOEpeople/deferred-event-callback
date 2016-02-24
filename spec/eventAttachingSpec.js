var lib = require('../deferred-event-callback');
var libConf;
var node;

afterEach(function() {
    window = undefined;
    node = undefined;
});

beforeEach(function() {
    window = {};

    node = {
        attachEvent: function() {},
        addEventListener: function() {}
    };

    libConf = {eventNames: ['keypress', 'keyup'], nodes: [node, node, node]};
});

it('should call attachEvent (if available) on each node with every eventName prefixed by "on"', function() {
    window.attachEvent = function() {};
    var spy = spyOn(node, 'attachEvent');
    lib(libConf, function() {});

    // 3 nodes * 2 events = 6 calls
    expect(spy).toHaveBeenCalledTimes(6);

    // 1st node
    expect(spy.calls.argsFor(0)[0]).toBe('onkeypress');
    expect(typeof spy.calls.argsFor(0)[1]).toBe('function');
    expect(spy.calls.argsFor(1)[0]).toBe('onkeyup');
    expect(typeof spy.calls.argsFor(1)[1]).toBe('function');

    // 2nd node
    expect(spy.calls.argsFor(2)[0]).toBe('onkeypress');
    expect(typeof spy.calls.argsFor(2)[1]).toBe('function');
    expect(spy.calls.argsFor(3)[0]).toBe('onkeyup');
    expect(typeof spy.calls.argsFor(3)[1]).toBe('function');

    // 3rd node
    expect(spy.calls.argsFor(4)[0]).toBe('onkeypress');
    expect(typeof spy.calls.argsFor(4)[1]).toBe('function');
    expect(spy.calls.argsFor(5)[0]).toBe('onkeyup');
    expect(typeof spy.calls.argsFor(5)[1]).toBe('function');
});

it('should not call addEventListener if attachEvent is available', function() {
    window.attachEvent = function() {};
    var spy = spyOn(node, 'addEventListener');
    lib(libConf, function() {});

    // 3 nodes * 2 events = 6 calls
    expect(spy).not.toHaveBeenCalled();
});

it('should call addEventListener (as fallback) on each node with every eventName', function() {
    window.addEventListener = function() {};
    var spy = spyOn(node, 'addEventListener');
    lib(libConf, function() {});

    // 3 nodes * 2 events = 6 calls
    expect(spy).toHaveBeenCalledTimes(6);

    // 1st node
    expect(spy.calls.argsFor(0)[0]).toBe('keypress');
    expect(typeof spy.calls.argsFor(0)[1]).toBe('function');
    expect(spy.calls.argsFor(1)[0]).toBe('keyup');
    expect(typeof spy.calls.argsFor(1)[1]).toBe('function');

    // 2nd node
    expect(spy.calls.argsFor(2)[0]).toBe('keypress');
    expect(typeof spy.calls.argsFor(2)[1]).toBe('function');
    expect(spy.calls.argsFor(3)[0]).toBe('keyup');
    expect(typeof spy.calls.argsFor(3)[1]).toBe('function');

    // 3rd node
    expect(spy.calls.argsFor(4)[0]).toBe('keypress');
    expect(typeof spy.calls.argsFor(4)[1]).toBe('function');
    expect(spy.calls.argsFor(5)[0]).toBe('keyup');
    expect(typeof spy.calls.argsFor(5)[1]).toBe('function');
});

it('should not call attachEvent if addEventListener is available', function() {
    window.addEventListener = function() {};
    var spy = spyOn(node, 'attachEvent');
    lib(libConf, function() {});

    expect(spy).not.toHaveBeenCalled();
});