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
    return db.get('illust').getById(id).value()
}

function mQuery(expl) {
   //FIXME 需要改 模糊匹配
    let res = db.get('illust').find(expl).value()
    console.log(res)
    return res
}

export default {
    save(illusts) {
        _(illusts).forEach((i) => {
            if (i.source && i.sourceId) {
                let existed = db.get('illust').find({
                    source: i.source,
                    sourceId: i.sourceId
                }).value()
                //console.log('existed', i.source, i.sourceId)
                if (existed) return
            }
            db.get('illust').push(i).write()
        })
    },
    getById(param, send) {
        send({
            data: getById(param.id),
            status: 1
        })
    },
    query(param, send) {
        send({ data: mQuery(param), status: 1 })
    }
}