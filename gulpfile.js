const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const webpack = require('webpack-stream');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const nesting = require('postcss-nesting');
const plumber = require('gulp-plumber');
const cssnano = require('cssnano');
const postcssImport = require('postcss-import');

gulp.task('compile-scripts', function () {
  return gulp.src(['Assets/js/script.js'])
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(uglify())
    .pipe(gulp.dest('wwwroot/scripts'));
});

gulp.task('compile-css', function (done) {
  return gulp.src(['Assets/css/styles.css'])
    .pipe(plumber({ errorHandler: (err) => done(err) }))
    .pipe(postcss([
      postcssImport(),
      nesting(),
      autoprefixer({ overrideBrowserslist: ['> 1%', 'last 3 versions'], cascade: false })
    ]))
    .pipe(concat('styles.css'))
    .pipe(postcss([cssnano()])) 
    .pipe(gulp.dest('wwwroot/styles'))
    .on('end', done);
});

gulp.task('watch', function () {
  gulp.watch('Assets/**/*.css', gulp.series('compile-css'));
  gulp.watch('Assets/**/*.js', gulp.series('compile-scripts'));
});
