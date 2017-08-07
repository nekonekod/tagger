const _ = require('underscore')

let log = require('log4js').getLogger()
let db = require('../util/db').getDB('tag')

db.default({
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

Tag.static.resolveTags = function (tags) {
  let tagSet = new Set()
  for (let name of tags) {
    let tag = Tag.checkThenSave(name)
    tagSet.add(tag.name)
  }
  return Array.from(tagSet)
}

Tag.static.getByNameOrSyn = function (name) {
  let collection = db.get('tag')
  let found
  let tag
  found = collection.find({name: name})
  if (tag = found.value()) return tag
  found = collection.find((item) => item.syn.contains(name))
  if (tag = found.value()) return tag
  return null
}

/*
 * 判断是否已经有name，有则返回，无则新建一个并返回
 * @param name
 * return exist or newSaved
 */
Tag.static.checkThenSave = function (name) {
  //如果已经是name或者在某个tag的syn中，则跳过
  let exist = Tag.getByNameOrSyn(name)
  if (exist) return exist
  Tag.newInstance({
    name: name,
    syn: [name]
  }).save()
  return this
}

Tag.save = function () {
  db.get('tag').push(this).write()
  log.info('tag saved')
}
