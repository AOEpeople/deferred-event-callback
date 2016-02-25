module.exports = function (config) {
    config.set({
        basePath: '',

        frameworks: ['browserify', 'jasmine'],

        files: [
            'deferred-event-callback.js',
            'spec/**/*.js'
        ],

        exclude: [],

        preprocessors: {
            'deferred-event-callback.js': ['browserify'],
            'spec/**/*.js': ['browserify']
        },

        reporters: ['progress'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: ['PhantomJS'],

        captureTimeout: 20000,

        singleRun: true,

        reportSlowerThan: 500,

        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-browserify'
        ]
    });
};
