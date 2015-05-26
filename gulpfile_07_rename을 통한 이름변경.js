var gulp = require('gulp');

// 07. rename 을 통한 이름변경
var rename = require("gulp-rename");
gulp.task('renameTest', function(){
  return gulp.src("sample.txt")
  .pipe(rename("renameText.txt"))
  .pipe(gulp.dest("./dist")); // dist에 복사됨
})

//06. concat 으로 js파일 연결
var concat = require('gulp-concat');
gulp.task('concatTest', function() {
  //return gulp.src(['./concatJs/concat01.js', './concatJs/concat02.js', './concatJs/concat03.js']) 하나씩 해줄려면 이렇게
  return gulp.src('./concatJs/*.js')
    .pipe(concat('daehanmingukmanse.js'))
    .pipe(gulp.dest('./dist/'));
});



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

// 01. 헬로월드를 했었었음 gulpfile_01_헬로월드.js 참고


gulp.task('default', ['scripts', 'hello']);

