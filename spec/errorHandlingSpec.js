var lib = require('../deferred-event-callback');

afterEach(function() {
    window = undefined;
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
        // TODO: Implement as soon as it is clear how to test this best
    });
    it('should throw error if options.nodes is not an Array', function() {
        expect(function() {
            lib({eventNames: ['keypress']}, function() {})
        })
            .toThrow(
            new Error('Missing nodes Array inf configuration object.')
        );
    });
    it('should fail silently if options.nodes.length is lower than 1', function() {
        // TODO: Implement as soon as it is clear how to test this best
    });
});

it('should throw error if there is neither window.addEventListener nor window.attachEvent', function() {
    window = {};

    expect(function() {
        lib({eventNames: ['keypress'], nodes: [{}]}, function() {})
    })
    .toThrow(
        new Error('Neither attachEvent nor addEventListener found. Are you using a browser or a dishwasher?')
    );
});