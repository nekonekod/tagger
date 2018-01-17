import lowdb from 'lowdb'
import lodashId from 'lodash-id'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'

console.log(__dirname)
const dbPath = path.join(__dirname, '../data', 'tagger.db')
const adapter = new FileSync(dbPath)
const db = lowdb(adapter)
db._.mixin(lodashId)

// const path = require('path')
// const os = require('os')
// const dbPath = path.join(os.homedir(), 'db.json')
// const db = low(dbPath)


// Set some defaults
db.defaults({
        illust: []
    })
    .write()

export default {
    save(illusts) {
        db.get('illust').push(illusts).write()
    },
    getById(param, send) {
        send({
            data: db.get('illust').getById(param.id).value(),
            status:1
        })
    }
}