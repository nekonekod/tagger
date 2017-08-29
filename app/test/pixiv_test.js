let log = require('../util/log').getLogger(__filename)

// let PixivClawer = require('../model/pixiv/pixiv_clawer')
// PixivClawer.claw('63995226', function (err, pixiv) {
//   if (err) log.error(err)
//   else pixiv.saveWithFilenameAndPath('63995226.jpg','~/Pictures/63995226_p0.jpg')
// })

const fs = require('fs')
const md5 = require('md5')
let st = Date.now();
fs.readFile('/Users/nekod/Pictures/63995226_p0.png', (err, buf) => {
  if (err) log.error(err)
  else log.info(md5(buf))
  log.info('cost ' + (Date.now()-st) + 'ms')
})
