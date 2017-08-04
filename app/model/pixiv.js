const _ = require('underscore')

let log = require('log4js').getLogger()
let db = require('../util/db').getDB('pixiv')

db.defaults({
  illust: []
}).write()

let Pixiv = {
  id: null,
  member: null,
  memberId: null,
  tags: []
}

Pixiv.newInstance = function (source) {
  _.extend(this, source)
  return this
}

// save to db
Pixiv.save = function () {
  if (this.id) {
    //check duplication
    let ills = db.get('illust')
    let dupl = ills.find({id: this.id}).value()
    if (dupl) {
      log.info('save error', 'duplication illust ', {id: dupl.id})
    } else {
      ills.push(this).write()
      log.info('illust saved', {id: this.id})
    }
  }
}

Pixiv.static = {}

module.exports = Pixiv
