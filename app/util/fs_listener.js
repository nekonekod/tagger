let chokidar = require('chokidar')
let _path = require('path');
let log = console.log.bind(console)


let fileMap = new Map()
let watcher

function init(dir) {
  watcher = chokidar.watch(dir, {
    ignored: /[\/\\]\./, //ignore hidden
    // persistent: true
  })

  watcher
      .on('ready', function () {
        log('Initial scan complete. Ready for changes.')
      })
      .on('add', function (path) {
        fileMap.set(path, getName(path));
        log('File', path, 'has been added')
      })
      .on('addDir', function (path) {
        log('Directory', path, 'has been added')
      })
      .on('unlink', function (path) {
        fileMap.delete(path);
        log('File', path, 'has been removed')
      })
      .on('unlinkDir', function (path) {
        log('Directory', path, 'has been removed')
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
  console.log('dirMap.size:',dirMap.size)
  console.log('fileMap.size:',fileMap.size)
  console.log('========================================')
}

function watch(dir) {
  if (watcher) {
    watcher.add(dir)
  } else {
    init(dir)
  }
}

exports.watch = watch

exports.getFileMap = () => {
  return fileMap
}
