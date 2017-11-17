let pixivClawer = require('../model/pixiv/pixiv_clawer')
let fsListener = require('../util/fs_listener')
let path = require('path')

const low = require('lowdb')
let db = low(path.join(__dirname, '../data/2017-10-29.json'))


exports.illust = function (param, send) {
  let res = db.get('pixiv').value()
  send(res)
}

exports.clawPixiv = function (param, send, event) {
  pixivClawer.claw(param)
    .then((data) => {
      send(data)
    })
}

exports.search = (param, send, event) => {
  let ids = db.get('pixiv')
    .filter((it) => {
      return it.tags.indexOf(param) > -1
    })
    .map((it) => {
      return it.id
    })
    .value()
  console.log(ids)
  let res = fsListener.getFilesLikeName(ids)
  send(res)
}