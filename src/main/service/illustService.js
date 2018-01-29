import lowdb from 'lowdb'
import _ from 'lodash'
import lodashId from 'lodash-id'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'

const TAG = 'illustService'

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

function mQuery(queryParam) {
    //TODO 需要改 模糊匹配
    let res = db.get('illust').filter(illust => {
        return (!queryParam._id || illust._id === queryParam._id) &&
            (!queryParam.source || illust.source === queryParam.source) &&
            (!queryParam.sourceId || illust.sourceId === queryParam.sourceId) &&
            (!queryParam.author || illust.author === queryParam.author) &&
            (!queryParam.authorId || illust.authorId === queryParam.authorId) &&
            vagueMatchTag(illust.tags, queryParam.tags) &&
            (!queryParam.comment || illust.comment === queryParam.comment) &&
            (!queryParam.title || illust.title === queryParam.title) &&
            ((!queryParam.minFav && !queryParam.maxFax) || (illust.fav >= queryParam.minFav) && (illust.fav <= queryParam.maxFav))
    }).value()
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
    ipcGetById(param, send) {
        send({
            data: getById(param.id),
            status: 1
        })
    },
    /**
     * query illust from db
     * @param {IllustQueryParam.js} queryParam 
     * @param send 
     */
    query(queryParam) {
        return mQuery(queryParam)
    },
    queryAll() {
        return db.get('illust').value()
    }
}