let log = require('../util/log').getLogger()

let PixivClawer = require('../model/clawer/pixiv_clawer')
PixivClawer.claw('27342318', function (err, pixiv) {
  if (err) log.error(err)
  else pixiv.save()
})
