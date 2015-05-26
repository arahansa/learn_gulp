var gulp = require('gulp');




//05. gutil을 통한 로깅
var gutil = require('gulp-util');
gulp.task('loggingtest', function(){
	gutil.log('stuff happened', 'Really it did', gutil.colors.yellow('123')); //주석
	gutil.beep();

	var newPath = gutil.replaceExtension('sample.txt', '.js'); // file.js
	gutil.log("replaceExtension : ", newPath);

	var opt = {
	  name: 'todd',
	  file: 'js/testUglify.js'
	};
	var tester = gutil.template('test : <%= name %> , file: <%= file %>', opt) // test todd /js/hi.js
	gutil.log("template : ", gutil.colors.red(tester));
});


// 04. CSS 최소화
var minifyCss = require('gulp-minify-css');
gulp.task('minify-css', function() {
  return gulp.src('css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

//03. 다른 task
gulp.task('hello', function(){
	console.log("그냥 인사 한번 해봤어요..")
})

// 02. 난독화
var uglify = require('gulp-uglify');
gulp.task('scripts', function(){
	gulp.src('js/*.js')
  	.pipe(uglify())
  	.pipe(gulp.dest('build/js'));
});


gulp.task('default', ['scripts', 'hello']);

