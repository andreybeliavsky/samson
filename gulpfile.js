const gulp = require('gulp');
const scss = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const del = require('del');
const gulpIf = require('gulp-if');
const yargs = require('yargs');
const gcmq = require('gulp-group-css-media-queries');

const { argv } = yargs;
const production = !!argv.production;

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: 'dist/',
    },
  });
});

gulp.task('scss', () => gulp.src('app/scss/*.scss')
  .pipe(gulpIf(!production, sourcemaps.init()))
  .pipe(scss({ outputStyle: 'expanded' }).on('error', scss.logError))
  .pipe(gulpIf(production, autoprefixer('last 10 versions')))
  .pipe(gulpIf(!production, sourcemaps.write()))
  .pipe(gcmq())
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.reload({ stream: true })));

gulp.task('html', () => gulp.src('app/*.html')
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.reload({ stream: true })));

gulp.task('js', () => gulp.src('app/js/*.js')
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.reload({ stream: true })));

gulp.task('video', () => gulp.src('app/video/*')
  .pipe(gulp.dest('dist/video')));

gulp.task('clean', async () => {
  del.sync('dist');
});

gulp.task('img', () => gulp.src('app/img/**/*')
  .pipe(gulp.dest('dist/img')));

gulp.task('watch', () => {
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('app/*.html', gulp.parallel('html'));
  gulp.watch('app/js/*.js', gulp.parallel('js'));
  gulp.watch('app/img/**/*', gulp.parallel('img'));
});

gulp.task('default', gulp.series('clean',
  gulp.parallel(['html', 'js', 'video', 'img', 'scss']),
  gulp.parallel(['browser-sync', 'watch'])));

gulp.task('prod', gulp.series('clean',
  gulp.parallel(['html', 'js', 'video', 'img', 'scss'])));
