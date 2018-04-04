import gulp from 'gulp';
import plumber from 'gulp-plumber';
import {browserSync} from './browser-sync';
import newer from 'gulp-newer';
import imagemin from 'gulp-imagemin';
import watch from 'gulp-watch';

import {path} from '../Config';

gulp.task("images", () => {
  return gulp.src(path.src.images)
    .pipe( watch(path.src.images) )
    .pipe( newer(path.src.imagesDir) )
    .pipe( plumber({
      errorHandler(err) {
        console.error(err);
        this.emit('end');
      }
    }) )
    .pipe( imagemin() )
    .pipe( gulp.dest(path.dist.root) )
    .pipe( plumber.stop() )
    .pipe( browserSync.stream() );
});
