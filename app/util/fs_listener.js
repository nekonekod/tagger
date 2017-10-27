let chokidar = require('chokidar')
let _path = require('path');
let log = console.log.bind(console)


let dirMap = new Map()
let fileMap = new Map()

function watch(dir) {
  let watcher = chokidar.watch(dir, {
    ignored: /[\/\\]\./, //ignore hidden
    // persistent: true
  })

  watcher
    .on('ready', function () {
      log('Initial scan complete. Ready for changes.')
      output()
    })
    .on('add', function (path) {
      fileMap.set(path, getName(path));
      log('File', path, 'has been added')
      output()
    })
    .on('addDir', function (path) {
      dirMap.set(path, getName(path));
      log('Directory', path, 'has been added')
      output()
    })
    .on('unlink', function (path) {
      fileMap.delete(path);
      log('File', path, 'has been removed')
      output()
    })
    .on('unlinkDir', function (path) {
      dirMap.delete(path);
      log('Directory', path, 'has been removed')
      output()
    })
    .on('change', function (path) {
      log('File', path, 'has been changed')
    })
    .on('error', function (error) {
      log('Error happened', error)
    })

// .on('raw', function (event, path, details) { log('Raw event info:', event, path, details) })

}

function getName(path) {
  let p = _path.parse(path)
  return p.name;
}

function output() {
  console.log('===============  output ================')
  console.log(dirMap)
  console.log(fileMap)
  console.log('========================================')
}

exports.watch = watch
exports.getDirMap = () => {
  return dirMap
}
exports.getFileMap = () => {
  return fileMap
}
