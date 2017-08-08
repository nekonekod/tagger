// 获取依赖
const gulp = require('gulp')
const childProcess = require('child_process')
const electron = require('electron')
const jade = require('jade')
const gulpJade = require('gulp-jade')

let paths = {
  app: 'app/**/*.js',
  jade: 'app/views/*.jade'
}

gulp.task('jade', function () {
  return gulp.src(paths.jade)
    .pipe(gulpJade({
      jade: jade,
      pretty: true
    }))
    .pipe(gulp.dest('public'))
})

// 创建 gulp 任务
gulp.task('run', function () {
  childProcess.spawn(electron, ['--debug=5858', '.'], {stdio: 'inherit'})
})
