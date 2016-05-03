const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserify = require("browserify");
const babelify = require("babelify");
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// break build if BrowserSync is not active
function onError(err){
  console.log(err.message);

  $.notify.onError({
    title: "Compile Error",
    message: err.message
  }).apply(this, Array.prototype.slice.call(arguments));

  if (browserSync.active) {
    this.emit('end');
  }
};

gulp.task('clean', () => del([ 'build' ], { dot: true }));

gulp.task('styles', () => {

  return gulp.src([ 'scss/main.scss' ])
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 10
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer([
      'ie >= 8',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 7',
      'ios >= 7',
      'android >= 4.4'
    ]))
    .pipe($.minifyCss())
    .pipe($.sourcemaps.write('.'))
    .pipe($.rename('react-responsive-menu.css'))
    .pipe(gulp.dest('build'))
    .pipe($.size({title: 'styles'}));
});

gulp.task('scripts', () => {
  return browserify({
        entries: ['lib/main.js'],
        paths: [ 'lib' ],
        debug : true // !gulp.env.production
      })
      .transform([ babelify ])
      .bundle()

      .on('error', onError)
      .pipe(source('react-responsive-menu.js'))
      .pipe(buffer())
      .pipe($.sourcemaps.init({
        loadMaps: true,
        base: '.'
        //sourceRoot: '..'
      })) // loads map from browserify file
      //.pipe($.uglify())
      .pipe($.sourcemaps.write('.')) // writes .map file
      .pipe(gulp.dest('build/'))
});

gulp.task('test', () => {
  return browserify({
        entries: ['test/test.js'],
        paths: [ 'lib' ],
        debug : true 
      })
      .transform([ babelify ])
      .bundle()

      .on('error', onError)
      .pipe(source('test.js'))
      .pipe(buffer())
      .pipe(gulp.dest('build/'))
});

gulp.task('compress', () => {
  return gulp.src('build/react-responsive-menu.js')
    .pipe($.uglify())
    .pipe($.rename('react-responsive-menu.min.js'))
    .pipe(gulp.dest('build/'));
});

// Watch Files For Changes & Reload
gulp.task('serve', ['styles', 'scripts', 'test'], () => {
  browserSync({
    notify: false,
    // https: true,
    server: [ '.' ],
    directory: true,
    startPath: '/test/index.html'
  });

  gulp.watch(['test/*.html'], [ reload ]);
  gulp.watch(['scss/**/*.scss'], [ 'styles', reload ]);
  gulp.watch(['lib/**', 'test/test.js'], [ 'scripts', 'test'/*, 'compress'*/, reload ]);
});

gulp.task('default', ['clean', 'styles', 'scripts', 'test', 'compress']);
