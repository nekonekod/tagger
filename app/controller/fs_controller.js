let fsListener = require('../util/fs_listener')
let fileMap = fsListener.getFileMap()

exports.watch = (param, send) => {
  fsListener.watch(param)
}

exports.bindWatch = (param, send) => {
  fsListener.watch(param)
  send('ok')
}

exports.search = (param, send) => {
  let result = []
  fileMap.forEach((k, v) => {
    if (v.indexOf(param) > -1) {
      result.push(v)
    }
  })
  send(result)
}


