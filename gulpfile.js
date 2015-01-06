var _gulp = require('gulp'),
	_compass = require('gulp-compass'),
	_notify = require('gulp-notify'),
	_plumber = require('gulp-plumber'),
	_gulpif = require('gulp-if'),
	_uncss = require('gulp-uncss'),
	_glob = require('glob'),
	_webserver = require('gulp-webserver');

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
});
_gulp.task('webserver', function() {
	_gulp.src('bin')
		.pipe(_webserver({
			livereload: true
		}));
});

_gulp.task('default',['webserver','watch']);