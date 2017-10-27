let fsListener = require('../util/fs_listener')
let dirMap = fsListener.getDirMap()
let fileMap = fsListener.getFileMap()

exports.filterByName = (param, send) => {
  let result = []
  console.log(fileMap)
  fileMap.forEach((k, v) => {
    if (v.indexOf(param) > -1) {
      result.push(v)
    }
  })
  send(result)
}
