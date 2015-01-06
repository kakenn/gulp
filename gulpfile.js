var _gulp = require('gulp');
var _compass = require('gulp-compass');
var _notify = require('gulp-notify');
var _plumber = require('gulp-plumber');
var _gulpif = require('gulp-if');
var _uncss = require('gulp-uncss');
var _glob = require('glob');
var _connect = require('gulp-connect');

var compileFlag = false;
var errHandler = function(err){
	compileFlag=false;
	notify.onError({
		title:    "Gulp",
		subtitle: "失敗",
		message:  "Error: <%= error.message %>",
		sound:    "Beep"
	})(err);
	this.emit('end');
}
_gulp.task('compass', function(){
	_gulp.src('src/sass/*.scss')
		.pipe(_plumber({errorHandler: _notify.onError('<%= error.message %>')}))
		.pipe(_compass({
			config_file: 'src/config.rb',
			comments: false,
			css: 'src/css/',
			sass: 'src/sass/'
		}))
});
_gulp.task('uncss', function(){
	_gulp.src('bin/css/*.css')
		.pipe(uncss({
			html: _glob.sync('bin/**/*.html')
		}))
		.pipe(_gulp.dest('bin/css/'));
});
_gulp.task('watch', function () {
	_gulp.watch('src/sass/*.scss',['compass']);
	_gulp.watch('src/css/*.css', ['uncss']);
	_gulp.watch('bin/*.html', ['html']);
});
_gulp.task('connect', function() {
	_connect.server({
		port: 8888,
		root: 'bin',
		livereload: true
	});
});
_gulp.task('html', function () {
	_gulp.src('bin/*.html')
		.pipe(_connect.reload());
});
_gulp.task('default',['connect','watch']);