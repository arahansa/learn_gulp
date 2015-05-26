var gulp = require('gulp');
var uglify = require('gulp-uglify');




//CSS 최소화
var minifyCss = require('gulp-minify-css');
gulp.task('minify-css', function() {
  return gulp.src('css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

//03 . 다른 task
gulp.task('hello', function(){
	console.log("그냥 인사 한번 해봤어요..")
})

// 02. Uglify
gulp.task('scripts', function(){
	gulp.src('js/*.js')
  	.pipe(uglify())
  	.pipe(gulp.dest('build/js'));
});

gulp.task('default', ['scripts', 'hello']);