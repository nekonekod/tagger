let log = require('../util/log').getLogger(__filename)

let PixivClawer = require('../model/pixiv/pixiv_clawer')
PixivClawer.claw('63995226', function (err, pixiv) {
  if (err) log.error(err)
  else pixiv.saveWithFilenameAndPath('63995226.jpg','~/Pictures/63995226_p0.jpg')
})
