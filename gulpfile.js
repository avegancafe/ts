var gulp = require('gulp');
var ts = require('gulp-typescript');
var nodemon = require('gulp-nodemon');
var pug = require('gulp-pug');

gulp.task('compile:ts', function () {
  return gulp.src('src/assets/**/*.ts')
    .pipe(ts({
        noImplicitAny: true,
        out: 'index.js'
    }))
    .pipe(gulp.dest('app/assets/javascripts'));
});

gulp.task('compile:pug', function () {
  return gulp.src('src/assets/views/**/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('app/assets/views'));
});

gulp.task('start', ['compile:ts', 'compile:pug'], function () {
  nodemon({
    script: 'main.js',
    ext: 'pug ts',
    tasks: function (files) {
      var tasks = [];
      for (var i = 0; i < files.length; i++) {
        var ext = files[i].match(/(\..+)/g)[0];
        if (ext == '.ts' && !~tasks.indexOf('compile:ts'))
          tasks.push('compile:ts');
        if (ext == '.pug' && !~tasks.indexOf('compile:ts'))
          tasks.push('compile:pug');
      }
      return tasks;
    }
  });
});

gulp.task('default', ['compile:ts', 'compile:pug', 'start']);
