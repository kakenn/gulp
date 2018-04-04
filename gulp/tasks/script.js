import gulp from 'gulp';
import plumber from 'gulp-plumber';
import {browserSync} from './browser-sync';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import watch from 'gulp-watch';
import {path} from '../Config';


gulp.task("script", () => {
  return gulp.src(path.src.script)
    .pipe( watch(path.src.script) )
    .pipe( plumber({
      errorHandler(err) {
        console.error(err);
        this.emit('end');
      }
    }) )
    .pipe( eslint({ useEslintrc: true }) )
    .pipe( eslint.format() )
    .pipe( eslint.failOnError() )
    .pipe( babel({
  	    presets: ['stage-2']
  	}))
    .pipe( gulp.dest(path.dist.script) )
    .pipe( plumber.stop() )
    .pipe( browserSync.stream() );
});
