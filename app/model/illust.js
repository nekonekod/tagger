const _ = require('underscore')

let log = require('log4js').getLogger(__filename)
let db = require('../util/db').getDB('illust')

db.defaults({
  illust: []
}).write()

let Illust = {
  filename: null,
  path:null,
  id:null,
  source:null,
  member: null,
  saveTime:Date.now(),
  fav:0,
  tags: []
}

Illust.newInstance = function (source) {
  _.extend(this, source)
  return this
}

// save to db
Illust.save = function () {
  if (this.path) {
    let ills = db.get('illust')
    //save illust
    ills.push(_.omit(this,'static')).write()
    log.info('illust saved', this)
  }
}

module.exports = Illust
