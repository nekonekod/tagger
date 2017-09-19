let request = require('request')
let cheerio = require('cheerio')
let logger = require('../../util/logger').logger(__filename)
let Promise = require('bluebird')

let PixivClawer = {}

PixivClawer.claw = Promise.promisify(function (pixivId, cb) {
  logger.info('pixiv id:', pixivId)
  request('https://www.Pixiv.net/member_illust.php?mode=medium&illust_id=' + pixivId, function (err, result) {
    if (err) {
      logger.error('pixiv clawer err,id:{},e:{}', pixivId, err)
      cb(err)
    } else {
      //R18 图 无法获取tag
      let html = result.body
      let $ = cheerio.load(html)
      try {
        //member
        let href = $('.userdata').find('.name a')
        let member = href.text()
        //member id
        let memberId = getMenberIdFromUrl(href.attr('href'))
        //tags
        let $lis = $('li.tag')
        let tagTexts = []
        $lis.each(function (i, li) {
          let tagText = $(li).find('.text').text()
          tagTexts.push(tagText)
        })
        let result = {
          id: pixivId,
          member: member,
          memberId: memberId,
          tags: tagTexts
        };
        cb(null, result)
      } catch (err) {
        cb(err, null)
      }
    }
  })
})

/*
 * 截取member的id
 * member.php?id=27517  --> 27527
 */
function getMenberIdFromUrl(url) {
  let seperator = 'id='
  let index = url.lastIndexOf(seperator)
  return url.substring(index + seperator.length)
}

module.exports = PixivClawer
