module.exports = function (config) {
  'use strict';

  config.set({

    basePath : '../',

    files : [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/angular-loading-bar/build/loading-bar.js',
      'client/**/*.js',
      'test/client/**/*.js'
    ],

    exclude: [
      'app/admin.js'
    ],

    autoWatch : true,
    colors: true,
    frameworks: ['jasmine'],

    browsers: ['PhantomJS'],

    plugins : [
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-phantomjs-launcher'
    ],

    junitReporter : {
      outputFile: 'logs/unit.xml',
      suite: 'unit'
    }
  });
};
