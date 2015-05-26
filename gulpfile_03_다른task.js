var gulp = require('gulp');
var uglify = require('gulp-uglify');


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

