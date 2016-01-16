var gulp = require('gulp');
var bump = require('gulp-bump');

/**
 * Bump patch version.
 */
gulp.task('bump', function () {
    gulp.src('./package.json')
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

gulp.task('default', function () {
    gulp.run('bump');
});
