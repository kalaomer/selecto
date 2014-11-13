'use strict';

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	less = require('gulp-less'),
	prefix = require('gulp-autoprefixer'),
	minifyCSS = require('gulp-minify-css'),
	sourcemaps = require('gulp-sourcemaps');

gulp.task('js', function () {
	return gulp.src('src/js/*.js')
	//	TODO: Uglify source map oluşturmada hatalı source üretiyor.
	//	.pipe(sourcemaps.init())
	//	.pipe(uglify())
	//	.pipe(sourcemaps.write('map'))
		.pipe(gulp.dest('build'))
});

gulp.task('less', function(){
	return gulp.src('src/less/*.less')
		.pipe(less())
		.pipe(prefix())
		.pipe(minifyCSS())
		.pipe(gulp.dest('build/css'));
});

gulp.task('watch', function() {
	gulp.watch('src/**/*.js', ['js']);
	gulp.watch('src/**/*.less', ['less']);
});

gulp.task('default', ['watch']);