var lib = require('../../deferred-event-callback');
var node;

afterEach(function() {
    node = undefined;
});

beforeEach(function() {
    node = document.createElement('span');
});

describe('general errors', function() {
    it('should throw error if first parameter (options) is not an object', function() {
        expect(function() {
            lib()
        })
        .toThrow(
            new Error('First argument needs to be an (configuration) object.')
        );
    });
    it('should throw error if second parameter (callback) is not a function', function() {
        expect(function() {
            lib({})
        })
        .toThrow(
            new Error('Second argument needs to be a (callback) function.')
        );
    });
});

describe('errors due to wrong option object', function() {
    it('should throw error if options.eventNames is not an Array', function() {
        expect(function() {
            lib({eventNames: ''}, function() {})
        })
            .toThrow(
            new Error('Missing eventNames Array in configuration object.')
        );
    });
    it('should fail silently if options.eventNames.length is lower than 1', function() {
        var spy;
        if (node.addEventListener) {
            spy = spyOn(node, 'addEventListener');
        } else {
            spy = spyOn(node, 'attachEvent');
        }

        lib({eventNames: [], nodes: [node, node]}, function() {});

        expect(spy).not.toHaveBeenCalled();
    });
    it('should throw error if options.nodes is not an Array', function() {
        expect(function() {
            lib({eventNames: ['keypress']}, function() {})
        })
            .toThrow(
            new Error('Missing nodes Array in configuration object.')
        );
    });
    it('should fail silently if options.nodes.length is lower than 1', function() {
        var spy;
        if (node.addEventListener) {
            spy = spyOn(node, 'addEventListener');
        } else {
            spy = spyOn(node, 'attachEvent');
        }

        lib({eventNames: ['keydown', 'keypress'], nodes: []}, function() {});

        expect(spy).not.toHaveBeenCalled();
    });
});