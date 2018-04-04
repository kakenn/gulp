import gulp from 'gulp';
import plumber from 'gulp-plumber';
import {browserSync} from './browser-sync';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import minifyCss from 'gulp-minify-css';
import watch from 'gulp-watch';
import {path} from '../Config';

gulp.task("style", () => {
    return gulp.src(path.src.sass)
        .pipe( watch(path.src.sass) )
        .pipe( plumber({
          errorHandler(err) {
            console.error(err);
            this.emit('end');
          }
        }) )
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        .pipe( minifyCss({advanced:false}) )
        .pipe( sourcemaps.write(path.dist.styleMap) )
        .pipe( gulp.dest(path.dist.style) )
        .pipe( plumber.stop() )
        .pipe( browserSync.stream() );
});
