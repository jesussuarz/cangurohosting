const gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require("browser-sync").create();

const paths = {
    themes: {
        src: './theme/*.scss',
        dest: './dist/css/'
    },
    scripts: {
        src: './js/**/*.js',
        dest: './dist/js/'
    }
};

function themes() {
    return gulp
        .src(paths.themes.src, {
            sourcemaps: true
        })
        .pipe(sass())
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(browserSync.stream())
        .pipe(gulp.dest(paths.themes.dest));
}

function scripts() {
    return gulp
        .src(paths.scripts.src, {
            sourcemaps: true
        })
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(paths.scripts.dest));
}

function watch() {
    browserSync.init({
        server: './'
    });
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.themes.src, themes);
    gulp.watch('./*.html').on('change', browserSync.reload);
}

var build = gulp.parallel(themes,  scripts, watch);

gulp.task(build);
gulp.task('default', build);