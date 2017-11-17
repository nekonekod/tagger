const low = require('lowdb')
let db = low(require('path').join(__dirname,'../data/2017-10-29.json'))

let tagKey = '時雨'

let all = db.get('pixiv')
  .filter((it) => {
    return it.tags.indexOf(tagKey) > -1
  })
  // .map((it) => {
  //   return {id: it.id, title: it.title}
  // })
  .value()
console.log(all)
