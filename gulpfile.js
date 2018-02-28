const gulp = require("gulp");
const uglify = require("gulp-uglify");

gulp.task('bundle', () => {
    gulp.src('src.js')
    .pipe(uglify())
    .pipe(gulp.dest('public'));
});