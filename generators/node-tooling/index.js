'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({

  installNpmDependencies: function () {
    this.npmInstall([
      'gulp',
      'gulp-sass',
      'gulp-sourcemaps',
      'gulp-autoprefixer',
      'gulp-concat',
      'del',
      'vinyl-source-stream',
      'vinyl-buffer',
      'browserify',
      'watchify',
      'babelify',
      'gulp-imagemin',
      'gulp-if',
      'gulp-cache'
    ], {
      'saveDev': true
    });
  },
  installFrontendNpmDependencies: function () {
    this.npmInstall([
      'bootstrap-sass'
    ], {
      'saveDev': true
    });
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('vendor.scss'),
      this.destinationPath('Resources/Private/Scss/vendor.scss')
    );
    this.fs.copy(
      this.templatePath('styles.scss'),
      this.destinationPath('Resources/Private/Scss/styles.scss')
    );
    this.fs.copy(
      this.templatePath('app.js'),
      this.destinationPath('Resources/Private/JavaScript/app.js')
    );
    this.fs.copy(
      this.templatePath('_gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );
    this.fs.copy(
      this.templatePath('Popcorn.jpeg'),
      this.destinationPath('Resources/Private/Images/Popcorn.jpeg')
    );
  }
});
