var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var TagSchema = new Schema({
  //名字
  name:String,
  //包含的文件
  tagFiles:[{
    type:ObjectId,
    ref:'TagFile'
  }],
  //创建时间
  createdAt:{
    type:Date,
    default:Date.now()
  }
})

module.exports = TagSchema