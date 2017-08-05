const _ = require('underscore')

let log = require('log4js').getLogger()
let db = require('../../util/db').getDB('pixiv')

db.defaults({
  illust: [],
  member: [],
  tags: [],
  tag_syn: []
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
    let ills = db.get('illust')
    let dupl = ills.find({id: this.id}).value()
    if (dupl) {
      log.info('save error', 'duplication illust ', {id: dupl.id})
      return
    }
    //add illust to member
    saveMember()
    log.info('member saved/updated', {memberId: this.memberId})
    //save tags TODO
    replaceTags()
    //save illust
    ills.push(this).write()
    log.info('illust saved', {id: this.id})
  }
}

//add member
function saveMember () {
  if (this.memberId) {
    let memberId = this.memberId
    let name = this.member
    let mems = db.get('member')
    let found = mems.find({memberId: memberId})
    let member = found.value()
    if (member) {
      //将name加入到syn
      if (member.syn.indexOf(name) < -1) {
        member.syn.push(name)
        found.assign({syn: member.syn}).write()
      }
    } else {
      mems.push({memberId: memberId, name: name, syn: [name]}).write()
    }
  }
}

function replaceTags () {
  if (this.tags) {

  }
}

module.exports = Pixiv
