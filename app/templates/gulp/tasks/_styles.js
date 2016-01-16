'use strict';

var gulp = require('gulp-help')(require('gulp'));
<% if (includeRubySass) { %>
var rubySass = require('gulp-ruby-sass');
<% } else if (includeLibSass) { %>
var sass = require('gulp-sass');
<% } %>
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var plumber = require('gulp-plumber');
<% if (includeBootstrap) { %>var replace = require('gulp-replace');<% } %>

var autoprefixer = require('autoprefixer');

var config = require('./../config.js');
var reload = require('./browserSync.js').reload;
var handleError = require('./../utils/handleError.js');

<% if (includeRubySass) { %>
// Compile scss using ruby sass

gulp.task('styles', 'Compile Sass to CSS', function () {
  return rubySass(config.styles.src, config.styles.sassCfg)
    .on('error', handleError)
    <% if (includeBootstrap) { %>.pipe(replace('../../bower_components/bootstrap-sass/assets/fonts/bootstrap/', '../fonts/'))<% } %>
    .pipe(postcss([
      autoprefixer(config.styles.autoprefixerCfg)
    ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.styles.dest))
    .pipe(reload({stream:true}));
});

<% } else if (includeLibSass) { %>
// Compile scss using libsass

gulp.task('styles', 'Compile Sass to CSS', function () {
  return gulp.src(config.styles.src)
    <% if (includeBootstrap) { %>.pipe(replace('../../bower_components/bootstrap-sass/assets/fonts/bootstrap/', '../fonts/'))<% } %>
    .pipe(sourcemaps.init())
    .pipe(sass(config.styles.sassCfg))
    .on('error', handleError)
    .pipe(postcss([
      autoprefixer(config.styles.autoprefixerCfg)
    ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.styles.dest))
    .pipe(reload({stream:true}));
}); 
<% } %>
