let log = require('../util/log').getLogger()

let PixivClawer = require('../model/pixiv/pixiv_clawer')
PixivClawer.claw('61078728', function (err, pixiv) {
  if (err) log.error(err)
  else pixiv.save()
})
