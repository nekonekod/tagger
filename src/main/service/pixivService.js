import fs from 'fs'
import async from 'async'
import uuid from 'uuid/v1'

import tagService from './tagService'

const source = 'pixiv'
const limit = 5
const cleanDirty = true
const offset = 8 * 1000 * 60 * 60

function parse(json) {
    let holder = JSON.parse(json)
    if (holder && holder.pixiv) {
        let models = holder.pixiv
        async.mapLimit(models, limit, doParse, function (err, results) {
            console.log(err, results)
        })
    }
}

function doParse(rawModel, callback) {
    if (cleanDirty) cleanDirtyRaw(rawModel)
    let illust = {
        id: uuid(),
        source: source,
        sourceId: rawModel.id,
        author: rawModel.author,
        authorId: rawModel.authorId,
        tags: tagService.updateTagString(rawModel.tags),
        updateTime: rawModel.date,
        comment: null,
        title: rawModel.title,
        fav: 0
    }
    callback(null, illust)
}

function cleanDirtyRaw(rawModel) {
    if (!rawModel) return
    if (!rawModel.date) rawModel.date = Date.now()
    if (isNaN(rawModel.date)) {
        let orig = rawModel.date
        rawModel.date = orig.indexOf('年') > -1 ?
            Date.parse(orig.replace('年', '/').replace('月', '/').replace('日', '')) + offset :
            Date.parse(orig)
    }
    if (!isNaN(rawModel.author)) {
        let tmp = rawModel.author
        rawModel.author = rawModel.authorId
        rawModel.authorId = tmp
    }
}

export default {

    import (param, send) {
        let path = param.path
        fs.readFile(path, (err, data) => {
            parse(data)
        })
        send({
            status: 1
        })
    }

}