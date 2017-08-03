let path = require('path')
console.log(__dirname)
let _path = path.join(__dirname, '..', '/config/record.txt')
console.log(_path)//测试路径对不对的

//fs 模块 操作文件
let fs = require('fs')

fs.readFile(_path, 'utf8', function (err, data) {
  if (err) return console.log(err)
  console.log(data)

  fs.writeFile(_path, 'electron + Javascript', function (err) {
    if (!err) {
      console.log('写入成功！')
    }
  })
})


module.exports = {test: 'fs'}
