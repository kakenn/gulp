const gulp = require('gulp');
const $ = require("gulp-load-plugins")();
const browserSync = require('browser-sync').create();
const rimraf = require('rimraf');
const runSequence = require('run-sequence');
 
gulp.task('clean', function (cb) {
  rimraf('./dist', cb);
});

gulp.task('reload',function(){
  browserSync.reload();
});
gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe($.plumber({
      handleError: function (err) {
          console.log(err);
          this.emit('end');
      }
    }))
    .pipe($.sass.sync().on('error', $.sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task("ejs",function(){
  return gulp.src(["./src/**/*.ejs",'!src/**/_*.ejs'])
    .pipe($.plumber({
      handleError: function (err) {
          console.log(err);
          this.emit('end');
      }
    }))
    .pipe($.ejs({},{"ext": ".html"}))
    .pipe(gulp.dest("./dist"));
});
gulp.task("babel",function(){
  return gulp.src('./src/script/**/*.js')
        .pipe($.sourcemaps.init())
        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/script'));
});

gulp.task('default',runSequence('clean',['ejs','sass','babel']), function() {
   browserSync.init({
       server: {
           baseDir: "./dist/"
       }
   });
   gulp.watch('./src/sass/**/*.scss',['sass','reload']);
   gulp.watch('./src/script/**/*.js',['babel','reload']);
   gulp.watch(["./src/**/*.ejs",'!src/**/_*.ejs'], ['ejs','reload']);
});
