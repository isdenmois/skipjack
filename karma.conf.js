module.exports = function (config) {
    config.set({
        basePath: './',

        frameworks: ['qunit', 'commonjs'],

        files: [
            'js/**/*.js',
            'test/**/*.js'
        ],

        exclude: [],

        preprocessors: {
            'js/**/*.js': ['commonjs', 'coverage'],
            'test/**/*.js': ['commonjs']
        },

        reporters: ['progress', 'coverage'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['Chrome'],

        singleRun: false,

        concurrency: Infinity,

        reportSlowerThan: 500
    })
};
