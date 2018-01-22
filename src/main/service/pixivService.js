import fs from 'fs'
import async, { parallel } from 'async'
import uuid from 'uuid/v1'
import _ from 'lodash'
import path from 'path'

import fsUtil from '../common/fsUtil'
import tagService from './tagService'
import illustService from './illustService'

import Illust from '../model/illust'

const source = 'pixiv'
const limit = 5
const cleanDirty = true
const offset = 8 * 1000 * 60 * 60
const suffix = ['jpg', 'png']

function doImport(rawFilePath, cb) {
    fs.readFile(rawFilePath, function(err, data) {
        parseAndSave(data)
        cb && cb()
    })
}

//TODO progress
//parse raw data to illust , save to db
function parseAndSave(json) {
    let holder = JSON.parse(json)
    if (holder && holder.pixiv) {
        let models = holder.pixiv
        async.mapLimit(models, limit, doParse, function(err, results) {
            if (err) console.log('pixiv service: parseAndSave', err)
            illustService.save(results)
        })
    }
}

//raw data => illust 
function doParse(rawModel, callback) {
    if (cleanDirty) cleanDirtyRaw(rawModel)

    let illust = new Illust({
        _id: uuid(),
        source: source,
        sourceId: rawModel.id,
        author: rawModel.author,
        authorId: rawModel.authorId,
        tags: tagService.updateTags(rawModel.tags),
        updateTime: rawModel.date,
        comment: null,
        title: rawModel.title,
        fav: 0
    })
    callback(null, illust)
}

//deal with dirty data
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

/**
 * rename image files:
 * 111_p.jpg -> 111.jpg
 * 111_p0.jpg -> no change
 * 111.jpg -> no change
 *
 * @param dir    root dir (with recursion)
 * @param dupDir if duplicated , move file to {dupDir}
 */
function doRenamePixivImageFiles(dir, dupDir, cb) {
    if (!fsUtil.isDir(dir)) {
        console.log('isDir', dir)
        throw new Error("renamePixivImageFiles:dir不存在", dir);
    }
    if (!fsUtil.isDirOrMkdir(dupDir)) {
        throw new Error("renamePixivImageFiles:创建dupDir失败", dupDir);
    }
    //now dir and dupDir both exists
    fsUtil.dealFileIn(dir, (f) => {
        if (f.fPath.indexOf('/.') >= 0)
            return false
        else if (f.isDir)
            return true
        return f.isFile && _(suffix).some(suffix => {
            return _(f.fName).endsWith(suffix)
        })
    }, function(f) {
        const mark = "_p."
        if (f.fName.indexOf(mark) > -1) {
            let newPath = f.fPath.replace(mark, '.')
            if (fsUtil.exists(newPath)) {
                console.warn('file dup exists:', f.fPath, 'try do be ', newPath, 'but already existed')
                newPath = path.join(dupDir, f.fName)
            }
            let err = fs.renameSync(f.fPath, newPath)
            if (err) {
                throw new Error('重命名失败：', f.fPath, newPath, err)
            }
        }
    }, true);
    cb && cb({
        status: 1
    })
}

// final String mark = "_p.";
// if (name.contains(mark)) {  //need rename
//     String newName = name.replace(mark, ".");
//     File newFile = Paths.get(f.getParent(), newName).toFile();
//     if (newFile.exists()) {
//         log.warn("file dup exists:{}", f.getAbsolutePath());
//         //move to dup
//         newFile = Paths.get(dupDir.toPath().toString(), newName).toFile();
//     }
//     if (f.renameTo(newFile)) {
//         log.info("move file {} to {}", f, newFile);
//     } else {
//         log.error("error: move file {} to {}", f, newFile);
//     }
// }

export default {
    importRaw(param, send) {
        doImport(param.path, () => {
            send({
                status: 1
            })
        })
    },
    renamePixivImageFiles(param, send) {
        doRenamePixivImageFiles(param.dir, param.dupDir, send)
    }
}