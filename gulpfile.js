'use strict';

var gulp = require('gulp');
var bump = require('gulp-bump');
var inline = require('gulp-inline');
var minifyCss = require('gulp-minify-css');
var webpack = require('gulp-webpack');
var jade = require('gulp-jade');
var less = require('gulp-less');

gulp.task('javascript', function () {
    return gulp.src('js/app.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./dist'));
});

/**
 * Bump patch version.
 */
gulp.task('bump', function () {
    return gulp.src('./package.json')
        .pipe(bump())
        .pipe(gulp.dest('./'));
});

gulp.task('bump-minor', function () {
    gulp.src('./package.json')
        .pipe(bump({type: 'Minor'}))
        .pipe(gulp.dest('./'));
});

gulp.task('bump-major', function () {
    gulp.src('./package.json')
        .pipe(bump({type: 'Major'}))
        .pipe(gulp.dest('./'));
});

/**
 * Inline all scripts and styles.
 */
gulp.task('inline', function () {
    return gulp.src('index.html')
        .pipe(inline({
            css: minifyCss
        }))
        .pipe(gulp.dest('dist/'));
});

/**
 * Build webpack.
 */
gulp.task('webpack', function() {
    return gulp.src('js/app.js')
        .pipe(webpack(require('./webpack.config')))
        .pipe(gulp.dest('./'));
});

/**
 * Compile JADE template.
 */
gulp.task('template', function() {
    gulp.src('./index.jade')
        .pipe(jade())
        .pipe(gulp.dest('./'))
});

/**
 * Compile LESS.
 */
gulp.task('less', function () {
    return gulp.src('./less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./'));
});

/**
 * Build webpack.
 */
gulp.task('webpack:debug', function() {
    var config = require('./webpack.config');
    delete config.plugins;
    return gulp.src('js/app.js')
        .pipe(webpack(config))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['template', 'less', 'webpack', 'inline', 'bump']);
