const low = require('lowdb')

let db = low('db.json')

//设置初始值
db.defaults({member:[]}).write()
db.get('member')
  .push({member: '123',memberId:'11111'})
  .push({member: '123',memberId:'11112'})
  .write()
