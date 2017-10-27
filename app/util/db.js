const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('../../low/data.json')
const db = low(adapter)

// illust:{name,source,sourceId,author,authorId,imgInfo,updateTime,tag:[]}
db.defaults({illust: []})
  .write()

