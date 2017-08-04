const path = require('path')
let low = require('lowdb')

exports.getDB = function (dbName) {
  let dbPath = path.join(__dirname, '../data/'+dbName+'.json')
  return low(dbPath)
}
