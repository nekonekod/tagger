var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var TagFileSchema = new Schema({
  //文件名
  filename:String,
  //文件路径
  path:String,
  //来源
  src:String,
  //作者
  author:String,
  //tag
  tags:[String],
  //创建时间
  createdAt:{
    type:Date,
    default:Date.now()
  }

})

module.exports = TagFileSchema