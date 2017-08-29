const _ = require('underscore')

let log = require('log4js').getLogger(__filename)
let db = require('../util/db')

db.getDB('tag').defaults({
  tag: []
}).write()

let Tag = {
  name: null,
  syn: []
}

Tag.newInstance = function (source) {
  _.extend(this, source)
  return this
}

Tag.save = function () {
  db.getCollection('tag').push(_.omit(this,'static')).write()
  log.info('tag saved')
}

Tag.static = {
  resolveTags: function (tags) {
    let tagSet = new Set()
    for (let name of tags) {
      let tag = Tag.static.checkThenSave(name)
      tagSet.add(tag.name)
    }
    return Array.from(tagSet)
  },
  getByNameOrSyn: function (name) {
    let collection = db.getCollection('tag')
    let found
    let tag
    found = collection.find({name: name})
    if (tag = found.value()) return tag
    found = collection.find((item) => item.syn.indexOf(name) > -1)
    if (tag = found.value()) return tag
    return null
  },
  /*
   * 判断是否已经有name，有则返回，无则新建一个并返回
   * @param name
   * return exist or newSaved
   */
  checkThenSave: function (name) {
    //如果已经是name或者在某个tag的syn中，则跳过
    let exist = Tag.static.getByNameOrSyn(name)
    if (exist) return exist
    Tag.newInstance({
      name: name,
      syn: [name]
    }).save()
    return Tag
  }
}

module.exports = Tag
