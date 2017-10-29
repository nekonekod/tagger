// 获取依赖
let gulp = require('gulp')
let childProcess = require('child_process')
// let electron = require('electron-connect').server.create();
const electron = require('electron')
// 创建 gulp 任务
gulp.task('default', function () {
  // electron.start()
  childProcess.spawn(electron, ['--debug=5858', '.'], {stdio: 'inherit'})
})
