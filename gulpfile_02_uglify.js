var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
  console.log("Gulp야 안녕 ? ^^;  ")
  gulp.src('js/*.js')
  	.pipe(uglify())
  	.pipe(gulp.dest('build/js'));
});
