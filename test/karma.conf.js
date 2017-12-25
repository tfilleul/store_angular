// Karma configuration
// Generated on 2016-07-30

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      <script src='/app/app/bower_components/jquery/dist/jquery.js'</script>
      <script src='/app/app/bower_components/angular/angular.js'</script>
      <script src='/app/app/bower_components/at-table/dist/angular-table.js'</script>
      <script src='/app/app/bower_components/bootstrap/dist/js/bootstrap.js'</script>
      <script src='/app/app/bower_components/angular-animate/angular-animate.js'</script>
      <script src='/app/app/bower_components/ng-file-upload/ng-file-upload.js'</script>
      <script src='/app/app/bower_components/angular-cookies/angular-cookies.js'</script>
      <script src='/app/app/bower_components/angular-resource/angular-resource.js'</script>
      <script src='/app/app/bower_components/angular-route/angular-route.js'</script>
      <script src='/app/app/bower_components/angular-sanitize/angular-sanitize.js'</script>
      <script src='/app/app/bower_components/angular-touch/angular-touch.js'</script>
      <script src='/app/app/bower_components/ngDialog/js/ngDialog.js'</script>
      <script src='/app/app/bower_components/angular-paginate-anything/src/paginate-anything.js'</script>
      <script src='/app/app/bower_components/angular-dropdowns/dist/angular-dropdowns.min.js'</script>
      <script src='/app/app/bower_components/angucomplete-alt/angucomplete-alt.js'</script>
      <script src='/app/app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js'</script>
      <script src='/app/app/bower_components/angular-ui-select/dist/select.js'</script>
      <script src='/app/app/bower_components/angular-mocks/angular-mocks.js'</script>
      // endbower
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
