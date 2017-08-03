const low = require('lowdb')

let db = low('db.json')

//设置初始值
// db.defaults({song:[]}).write()
// db.get('song')
//   .push({title: 'hhha'})
//   .push({title: 'hhhb'})
//   .write()

let songs = db.get('song').find({title:'hhha'}).value()
console.log(songs)

console.log(db.has('song').value()) //true

console.log(db.set('song',[]))
