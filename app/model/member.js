const _ = require('underscore')

let log = require('log4js').getLogger(__filename)
let db = require('../util/db')

db.getDB('member').defaults({
  member: []
}).write()

let Member = {
  id: null,
  source: null,
  name: null,
  syn: []
}

Member.newInstance = function (source) {
  _.extend(this, source)
  return this
}

Member.save = function () {
  db.getCollection('member')
    .push(_.omit(this, 'static'))
    .write()
  log.info('member saved', this)
}

Member.static = {
  //先匹配(id,source)，再匹配name，在匹配syn,都无则新增
  addSyn: function (id, source, name) {
    let collection = db.getCollection('member')
    let found
    let member
    if (id && source) {
      //match (id,source)
      found = collection.find({id: id, source: source})
      if (member = found.value()) {
        if (member.syn.indexOf(name) < 0) {
          member.syn.push(name)
          found.write()
          log.info('member updated', member)
        }
        return true
      }
    }
    if (name) {
      //match name
      found = collection.find({name: name})
      if (member = found.value()) {
        member.id = id
        member.source = source
        if (member.syn.indexOf(name) < 0) {
          member.syn.push(name)
        }
        found.write()
        log.info('member updated', member)
        return true
      }
      //match syn
      found = collection.find((item, index) => item.syn.indexOf(name) > -1)
      if (member = found.value()) {
        member.id = id
        member.source = source
        found.write()
        log.info('member updated', member)
        return true
      }
      //add new member
      Member.newInstance({
        id: id,
        source: source,
        name: name,
        syn: [name]
      }).save()
      return true
    }
  }
}

module.exports = Member
