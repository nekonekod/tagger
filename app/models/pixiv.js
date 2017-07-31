var request = require('request')
var cheerio = require('cheerio')
var _ = require('underscore')
var TagFile = require('./tag_file')
var Tag = require('./tag')

var src = 'pixiv'

function Pixiv(source) {
  _.extend(this,source)
}

Pixiv.claw = function (pixivId, cb) {
  request('https://www.Pixiv.net/member_illust.php?mode=medium&illust_id='+pixivId,function(err, result){
    if(err){
      cb(err)
    }else{
      pixiv = new Pixiv()
      var html = result.body
      var $ = cheerio.load(html);
      //author
      var author = $('.userdata').find('.name a').text()
      //tags
      var $lis = $('li.tag')
      var tagTexts = []
      $lis.each(function(i,li){
        var tagText = $(li).find('.text').text()
        tagTexts.push(tagText)
      })
      cb(null,new Pixiv({
        id : pixivId,
        author : author,
        tags : tagTexts
      }))
    }
  })
}

Pixiv.toTagFile = function (pixiv,cb) {
  var _tagFile = new TagFile({
    filename:'...filename',
    path:'....path',
    src:src,
    author:pixiv.author,
    tags:pixiv.tags
  })
  //TODO 下面逻辑放到tag_file.js下
  _tagFile.save(function(err,tagFile){
    console.log(tagFile)
    if(err) cb(err)
    function tagSaveCb(err,tag){
      if(err) cb(err)
      else{
        console.log('tag:'+String.stringify(tag))
        cb(null,tagFile)
      }
    }
    tagFile.tags.forEach(function (name) {
      var t = Tag.findOne({name:name})
      if(t){
        t.tagFiles.push(tagFile)
        t.save(tagSaveCb)
      }else{
        new Tag({
          name:name,
          tagFiles:[tagFile]
        }).save(tagSaveCb)
      }
    })
  })
}

module.exports = Pixiv