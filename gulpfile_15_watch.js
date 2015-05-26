var gulp = require('gulp');


//15. watch를 통한 실시간 변경
gulp.task('watch', function(){
  //css폴더의 scss파일들이 변경되면 sass태스크 실행
  gulp.watch('css/*.scss', ['sass']);
});


// 14. gulp-ruby-sass를 통한 sass를 css화
var sass = require('gulp-ruby-sass');
gulp.task('sass', function () {
    return sass('css/')
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(gulp.dest('build/css'));
});


// 13. 이미지 압축
// 그냥 자동 플러그인 안 써주고 명시적으로 적어주겠습니다 ^^; 
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
gulp.task('imgmin', function () {
    return gulp.src('src/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images'));
});


// 12. gulp-load-plugins를 통한 플러그인 관리
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins(
 //옵션들 여기다가 넣어줌
);

// 11. autoPrefixer
gulp.task('autoPrefixer', function () {
    return gulp.src('css/app.css')
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'));
});

// 10. Iconfont를 통한 svg파일 웹폰트 변환
gulp.task('Iconfont', function(){
  gulp.src(['assets/icons/*.svg'])
    .pipe(plugins.iconfont({
      fontName: 'myfont', // required
      appendCodepoints: true  // recommended option
      //fontHeight : 1000
      // normalize:true
    }))
      .on('codepoints', function(codepoints, options) {
        // CSS templating, e.g.
        console.log(codepoints, options);
      })
    .pipe(gulp.dest('www/fonts/'));
});

// 09. Plumber 를 이용한 에러핸들링
gulp.task('plumberTest', function() {
	return gulp.src('./test/plumberTest.js') 
        .pipe(plugins.plumber({
            errorHandler: onError
        }))
        .pipe(plugins.uglify())
  		.pipe(gulp.dest('build/js'));
});
// plumber 에러핸들러 함수를 외부에 정의해놓겠습니다.
var onError = function(err) {
	console.log(err);
}



//08. sourcemaps로 source map을 지원하는 여러 작업 한번에 처리
gulp.task('sourcemapsTest', function() {
  gulp.src('./concatJs/*.js')
    .pipe(plugins.sourcemaps.init())
      .pipe(plugins.concat('daehanmingukmanseVersion2.js'))
      .pipe(plugins.uglify())
      .pipe(plugins.rename('daehanmingukmanse.min.js'))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('dist'));
});




// 07. rename 을 통한 이름변경
gulp.task('renameTest', function(){
  return gulp.src("sample.txt")
  .pipe(plugins.rename("renameText.txt"))
  .pipe(gulp.dest("./dist")); // dist에 복사됨
})



//06. concat 으로 js파일 연결
gulp.task('concatTest', function() {
  //return gulp.src(['./concatJs/concat01.js', './concatJs/concat02.js', './concatJs/concat03.js']) 하나씩 해줄려면 이렇게
  return gulp.src('./concatJs/*.js')
    .pipe(plugins.concat('daehanmingukmanse.js'))
    .pipe(gulp.dest('./dist/'));
});


//05. gutil을 통한 로깅
// var gutil = require('gulp-util');
gulp.task('loggingtest', function(){
  plugins.util.log('stuff happened', 'Really it did', plugins.util.colors.yellow('123')); //주석
  plugins.util.beep();

  var newPath = plugins.util.replaceExtension('sample.txt', '.js'); // file.js
  plugins.util.log("replaceExtension : ", newPath);

  var opt = {
    name: 'todd',
    file: 'js/testUglify.js'
  };
  var tester = plugins.util.template('test : <%= name %> , file: <%= file %>', opt) // test todd /js/hi.js
  plugins.util.log("template : ", plugins.util.colors.red(tester));
});



// 04. CSS 최소화
gulp.task('minify-css', function() {
  return gulp.src('css/*.css')
    .pipe(plugins.minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

//03. 다른 task
gulp.task('hello', function(){
	console.log("그냥 인사 한번 해봤어요..")
})

// 02. 난독화
gulp.task('uglify', function(){
	gulp.src('js/*.js')
  	.pipe(plugins.uglify())
  	.pipe(gulp.dest('build/js'));
});

// 01. 헬로월드를 했었었음 gulpfile_01_헬로월드.js 참고


gulp.task('default', ['uglify', 'hello']);

