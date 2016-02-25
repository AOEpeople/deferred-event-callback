var lib = require('../../deferred-event-callback');
var $ = require('jquery');
var libConf;
var node;

afterEach(function() {
    node = undefined;
});

beforeEach(function() {
    node = document.createElement('span');

    libConf = {eventNames: ['keypress', 'keyup'], nodes: [node, node, node]};
});

it('should call addEventListener on each node with every eventName', function() {
    window.attachEvent = undefined;

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