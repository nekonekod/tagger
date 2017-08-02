// 获取依赖
let gulp = require('gulp'),
    childProcess = require('child_process'),
    electron = require('electron');

// 创建 gulp 任务
gulp.task('run', function () {
    childProcess.spawn(electron, ['--debug=5858','.'], {stdio:'inherit'});
});