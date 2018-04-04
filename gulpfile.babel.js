import gulp from 'gulp';
import {path} from './gulp/Config';

import './gulp/tasks/style';
import './gulp/tasks/script';
import './gulp/tasks/ejs';
import './gulp/tasks/image';
import './gulp/tasks/browser-sync';

gulp.task('default', ['browser-sync', 'build'], function(){});
gulp.task('build', ['style', 'script', 'ejs', 'images']);
