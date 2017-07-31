var _ = require('underscore')
var Promise = require('bluebird')
var TagFile = require('../models/tag_file')
var Tag = require('../models/tag')
var Pixiv = require('../models/pixiv')


var TagFileConntroller = {}

TagFileConntroller.resolve = function (req ,res) {
  var pixivId = req.param('id') || '26841120'
  Promise.delay(0)
      .then(function(){
        return Promise.promisify(Pixiv.claw)(pixivId)
      })
      .then(function(pixiv){
        // return Promise.promisify(Pixiv.toTagFile)(pixiv)
        Pixiv.toTagFile(pixiv,function (err,tagFile) {
          if(err) console.log(err)
          console.log(tagFile)
          res.render('index')
        })
      })
      // .then(function (tagFile) {
        // console.log(tagFile)
        // tagFile.save(function(err,tagFile){
        //   console.log(tagFile)
        //   res.redirect('/')
        // })
        // res.render('index')
      // })

}


module.exports = TagFileConntroller