const gulp = require("gulp");
const uglify = require("gulp-uglify");
const babel = require('gulp-babel');
const rename = require("gulp-rename");

gulp.task('copy', () => {
    return gulp.src(['src/**/*', '!src/**/*.js'])
    .pipe(gulp.dest('public/'));
});

gulp.task('uglify', () => {
    return gulp.src(['src/js/**/*.js'])
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(uglify())
    .pipe(rename("bundle.js"))
    .pipe(gulp.dest('public/js'));
});

