const gulp = require("gulp");
const uglify = require("gulp-uglify");
const babel = require('gulp-babel');
const rename = require("gulp-rename");
const browserify = require('browserify');
const vueify = require('vueify');
const source = require('vinyl-source-stream');

gulp.task('javascript', function () {
  var b = browserify({
      entries: './src/front/main.js',
      debug: true,
      // defining transforms here will avoid crashing your stream
      transform: [vueify]
    });
    return b.bundle()
        .pipe(source('app.js'))
        //.pipe(uglify())
        // .pipe(sourcemaps.init({loadMaps: true}))
        //     // Add transformation tasks to the pipeline here.
        //     .pipe(uglify())
        //     .on('error', gutil.log)
        // .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/js/'));
});

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
