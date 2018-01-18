import lowdb from 'lowdb'
import _ from 'lodash'
import lodashId from 'lodash-id'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'

console.log(__dirname)
const dbPath = path.join(__dirname, '../data', 'tagger.db')
const adapter = new FileSync(dbPath)
const db = lowdb(adapter)
db._.mixin(lodashId)
db._.id = '_id'

// const path = require('path')
// const os = require('os')
// const dbPath = path.join(os.homedir(), 'db.json')
// const db = low(dbPath)


// Set some defaults
db.defaults({
        illust: []
    })
    .write()

function getById(id) {
    let res = db.get('illust').getById(id).value()
    console.log(db.get('illust').value())
    console.log('getById', id, res)
    return res
}

export default {
    save(illusts) {
        // let col = db.get('illust')
        _(illusts).forEach((i)=>{
          db.get('illust').push(i).write()
        })
        // col.write()
    },
    getById(param, send) {
        send({
            data: getById(param.id),
            status: 1
        })
    }
}