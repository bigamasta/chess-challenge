
var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    singleRun: true,
    frameworks: ['mocha', 'es6-shim'],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'tests.webpack.js'
    ],
    preprocessors: {
      'src/**/*.js': ['babel'],
      'test/**/*.js': ['babel'],
      'tests.webpack.js': ['webpack']
    },
    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: 'build/coverage/',
      type: 'html'
    },
    webpack: {
      module: {
        loaders: [
          {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'},
          { test: /\.css$/, loader: "style/useable!css!" }
        ]
      },
      watch: true
    },
    webpackServer: {
      noInfo: true
    }
  });
};
