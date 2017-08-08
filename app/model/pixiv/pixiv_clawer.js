let request = require('request')
let cheerio = require('cheerio')
let Pixiv = require('./pixiv')

let PixivClawer = {}

PixivClawer.claw = function (pixivId, cb) {
  request('https://www.Pixiv.net/member_illust.php?mode=medium&illust_id=' + pixivId, function (err, result) {
    if (err) {
      cb(err)
    } else {
      //TODO R 18 图 不登录无法获取tag
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
        cb(null, Pixiv.newInstance({
          id: pixivId,
          member: member,
          memberId: memberId,
          tags: tagTexts
        }))
      } catch (err) {
        cb(err, null)
      }
    }
  })
}

/*
 * 截取member的id
 * member.php?id=27517  --> 27527
 */
function getMenberIdFromUrl (url) {
  let seperator = 'id='
  let index = url.lastIndexOf(seperator)
  return url.substring(index + seperator.length)
}

module.exports = PixivClawer
