var gulp = require('gulp'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  del = require('del'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  babel = require('babelify'),
  gulpIf = require('gulp-if'),
  cache = require('gulp-cache'),
  imagemin = require('gulp-imagemin');

var inputImagesDir = './Resources/Private/Images';
var inputSassDir = './Resources/Private/Scss';
var inputJsDir = './Resources/Private/JavaScript';

var outputDir = './Resources/Public';
var outputDirCss = './Resources/Public/Css';
var outputDirImages = './Resources/Public/Images';
var outputDirJs = './Resources/Public/JavaScript';

var sassIncludePaths = [
  'node_modules'
];

function getEnv() {

  if (typeof process.env.NODE_ENV === 'undefined') {
    return 'development';
  }

  return process.env.NODE_ENV;
}

function extend(target) {
  var sources = [].slice.call(arguments, 1);
  sources.forEach(function (source) {
    for (var prop in source) {
      target[prop] = source[prop];
    }
  });
  return target;
}

function compileJs(watch) {

  var bundler = watchify(browserify(inputJsDir + '/' + 'app.js', {debug: true})
    .transform(babel));

  function rebundle() {
    bundler.bundle()
      .on('error', function (err) {
        console.error(err);
        this.emit('end');
      })
      .pipe(source('build.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(outputDirJs));
  }

  if (watch) {
    bundler.on('update', function () {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watchJs() {
  return compile(true);
}

gulp.task('default', function () {
  console.log('foo');
});

gulp.task('clean', function () {

  del(['./Resources/Public/Css', './Resources/Public/JavaScript']);
});

gulp.task('js', function () {
  return compileJs();
});

gulp.task('watchJs', function () {
  return watchJs();
});

gulp.task('images', function () {
  return gulp.src(inputImagesDir + '/**/*')
    .pipe(gulpIf(gulpIf.isFile, cache(imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
      .on('error', function (err) {
        console.log(err);
        this.end();
      })))
    .pipe(gulp.dest(outputDirImages));
});

gulp.task('sass', function () {

  var settings = {};

  var developmentSettings = {
    includePaths: sassIncludePaths,
    sourceComments: true,
    outputStyle: 'expanded'
  };
  var productionSettings = {
    includePaths: sassIncludePaths,
    sourceComments: false,
    outputStyle: 'compressed'
  };

  if (getEnv() === 'development') {
    settings = developmentSettings;
  }

  if (getEnv() === 'production') {
    settings = productionSettings;
  }

  gulp.src(inputSassDir + '/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(sass(settings)
      .on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(outputDirCss));
});
