const gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require("browser-sync").create();

const paths = {
    styles: {
        src: './theme/**/*.scss',
        dest: './output/'
    },
    scripts: {
        src: './js/**/*.js',
        dest: './output/'
    }
};

function styles() {
    return gulp
        .src(paths.styles.src, {
            sourcemaps: true
        })
        .pipe(sass())
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(browserSync.stream())
        .pipe(gulp.dest(paths.styles.dest));
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
    gulp.watch(paths.styles.src, styles);
    gulp.watch('./*.html').on('change', browserSync.reload);
}

var build = gulp.parallel(styles, scripts, watch);

gulp.task(build);
gulp.task('default', build);