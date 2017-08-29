const _ = require('underscore')

let log = require('log4js').getLogger(__filename)
let Illust = require('../illust')
let Member = require('../member')
let Tag = require('../tag')

let db = require('../../util/db')

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
Pixiv.saveWithFilenameAndPath = function (filename, path) {
  if (this.id) {
    let ills = db.getCollection('illust', 'illust')
    let dupl = ills.find({id: this.id}).value()
    if (dupl) {
      log.info('save error', 'duplication illust ', this, dupl)
      return false
    }
    updateTags()
    saveMember()
    saveIllust(filename, path)
    return true
  }
  return false
}

function updateTags() {
  Pixiv.tags = Tag.static.resolveTags(Pixiv.tags)
}

function saveMember() {
  if (Pixiv.memberId && Pixiv.member) {
    Member.static.addSyn(Pixiv.memberId, 'pixiv', Pixiv.member)
  }
}

function saveIllust(filename, path) {
  Illust.newInstance({
    filename: filename,
    path: path,
    id: Pixiv.id,
    source: 'pixiv',
    member: Pixiv.member,
    tags: Pixiv.tags
  }).save()
}


module.exports = Pixiv
