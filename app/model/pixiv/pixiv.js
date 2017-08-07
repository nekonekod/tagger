const _ = require('underscore')

let log = require('log4js').getLogger()
let Illust = require('../illust')
let Member = require('../member')

let dbIllust = require('../../util/db').getDB('illust')

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
    let ills = dbIllust.get('illust')
    let dupl = ills.find({id: this.id}).value()
    if (dupl) {
      log.info('save error', 'duplication illust ', this, dupl)
      return false
    }
    updateTags(this)
    //TODO
    saveMember()
    saveIllust()
    return true
  }
  return false
}

function updateTags (pixiv) {

}

function saveMember () {
  if (this.memberId && this.member) {
    Member.static.addSyn(this.memberId, 'pixiv', this.member)
  }
}

function saveIllust () {
  Illust.newInstance({
    filename: this.id,
    path: '',
    id: this.id,
    source: 'pixiv',
    members: this.member,
    tags: this.tags
  }).save()
}

function replaceTags () {
  if (this.tags) {

  }
}

module.exports = Pixiv
