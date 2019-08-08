var gulp = require('gulp');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
var pug = require('gulp-pug');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
sass.compiler = require('node-sass');



gulp.task('sass', function () {
  //return gulp.src('./sass/*.sass')
  return gulp.src('./sass/style.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css/'));
});

gulp.task('css', function () {
  //return gulp.src('./css/*.css')
  return gulp.src('./css/style.css')
    .pipe(uglifycss({
      "uglyComments": true
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('pug',function() {
 return gulp.src('./*.pug')
 .pipe(pug({
    doctype: 'html',
    pretty: false
 }))
 .pipe(gulp.dest('./'));
});

gulp.task('scripts', function() {
  //return gulp.src('./lib/*.js')
  return gulp.src(['./js/TweenMax.min.js', './js/ScrollToPlugin.min.js', './js/ScrollMagic.min.js', './js/animation.gsap.js', './js/script.js'])
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./dist/'));
});






gulp.task('watch', gulp.series('sass', 'pug', 'css', function () {
  gulp.watch('./sass/*.sass', gulp.series('sass'));
  gulp.watch('./*.pug', gulp.series('pug'));
  gulp.watch('./css/*.css', gulp.series('css'));
  gulp.watch('./js/*.js', gulp.series('scripts'));
}));

gulp.task('default', gulp.series('watch'));
