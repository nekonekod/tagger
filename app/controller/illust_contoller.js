let pixivClawer = require('../model/pixiv/pixiv_clawer')
let fsListener = require('../util/fs_listener')
const path = require('path')
const {shell} = require('electron')

const low = require('lowdb')
let db = low(path.join(__dirname, '../data/pixivs.json'))


exports.illust = function (param, send) {
  let res = db.get('pixiv').value()
  send(res)
}


exports.open = (param,send) => {
  shell.openItem(param)
  send({status:'1'})
}

exports.findInExplore = (param,send) => {
  shell.showItemInFolder(param)
  send({status:'1'})
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

