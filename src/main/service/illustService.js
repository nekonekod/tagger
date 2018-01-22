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
    //TODO 需要改 模糊匹配
    let res = db.get('illust').filter(illust => {
        return (!expl._id || illust._id === expl._id) &&
            (!expl.source || illust.source === expl.source) &&
            (!expl.sourceId || illust.sourceId === expl.sourceId) &&
            (!expl.author || illust.author === expl.author) &&
            (!expl.authorId || illust.authorId === expl.authorId) &&
            vagueMatchTag(illust.tags, expl.tags) &&
            (!expl.comment || illust.comment === expl.comment) &&
            (!expl.title || illust.title === expl.title) &&
            (!expl.fav || illust.fav === expl.fav)
    }).value()
    console.log(res)
    return res
}

function vagueMatchTag(tagsArr, explTags) {
    return explTags && tagsArr && _(explTags).filter(t => {
        let tmp = _(tagsArr).filter(t2 => t2.indexOf(t) > -1).value()
        return tmp.length > 0
    }).value().length > 0
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