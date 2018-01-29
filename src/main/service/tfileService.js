import _ from 'lodash'

import illstService from './illustService'
import fswatcher from '../common/fswatcher'
import IllustQueryParam from '../model/illustQueryParam'
import TFile from '../model/tFile';

const TAG = 'tFIleService'

function queryTFile(expl) {
    console.log(TAG, 'queryTFile', expl)
    let param = new IllustQueryParam(expl)
    if (param.isEmptyCondition()) return tFiles()
    let illusts = illstService.query(param)
    console.log(TAG, 'queryTFile found [', illusts.length, '] illust records')
    return fswatcher.matchAndMap(
        illusts,
        (illust) => illust.sourceId,
        (dir, file) => {
            // console.log(TAG, 'not found', dir, file)
            return null
        },
        (dir, file, illust) => {
            let expl = _.assign(illust, { dir: dir, file: file })
            console.log(TAG, 'found', dir, file, illust)
            return new TFile(expl)
        }, matchExt)
}

function tFiles() {
    let illusts = illstService.queryAll()
    console.log(TAG, 'fFiles()')
    return fswatcher.matchAndMap(
        illusts,
        (illust) => illust.sourceId,
        (dir, file) => {
            // console.log(TAG, 'not found', dir, file)
            return new TFile({ dir: dir, file: file })
        },
        (dir, file, illust) => {
            let expl = _.assign(illust, { dir: dir, file: file })
            console.log(TAG, 'found', dir, file, illust)
            return new TFile(expl)
        }, matchExt)
}

function matchExt(dir, file) {
    let exts = getFileExt()
    return exts && exts.length > 0 ?
        _.some(exts, (e) => file.indexOf(e) > -1) : true
}

function getFileExt() {
    return ['png', 'jpg']
}

export default {
    ipcQueryTFile(param, send) {
        send({
            data: queryTFile(param),
            status: 1
        })
    }
}