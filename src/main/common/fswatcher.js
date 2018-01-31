import chokidar from 'chokidar'
import ipcM from '../common/ipcM'
import _ from 'lodash'
import path from 'path'
import fsUtil from './fsUtil'
import async from 'async'

const TAG = 'fswatcher'
let log = console.log.bind(console)

let watcher = chokidar.watch([], {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    disableGlobbing: true,
    followSymlinks: false,
    depth:0
});

let ignoredDirs = []

watcher.on('addDir', path => {
        pushWatchedDirs()
        // log(`Directory ${path} has been added`)
    })
    .on('unlinkDir', path => {
        pushWatchedDirs()
        // log(`Directory ${path} has been removed`)
    })
    .on('error', error => log(`Watcher error: ${error}`))
    .on('ready', () => log('Initial scan complete. Ready for changes'))
    .on('raw', (event, path, details) => {
        // log('Raw event info:', event, path, details);
    });

let pushWatchedDirs = _.debounce(() => {
    ipcM.push('fs/watch/watchedDirs', {
        data: watchedDirs(),
        status: 1
    })
}, 1000)

function watchedDirs() {
    return Object.keys(watcher.getWatched())
}


export default {
    register(path) {
        async.series([(cb)=>{
            watcher.add(path)
        }])
    },
    // unregister(path) {
    //     log('unwatch:', path)
    //     watcher.unwatch(path)
    // },
    watchedDirs() {
        return watchedDirs()
    },
    matchAndMap(src, keyGenFun, orElseFun, mapperFun, fileFilter) {
        if (!src || src.length === 0) return []
        let dirAndFiles = watcher.getWatched()
        // log(TAG,dirAndFiles)
        // return []
        let rest = _.map(dirAndFiles, (files, dir) => {
            // log(TAG, dir, files)
            return _(files).filter((f) => {
                return fileFilter ? fileFilter(dir, f) : true
            }).map((f) => {
                let fPath = path.join(dir, f)
                //match src name
                let isFile = fsUtil.isFile(fPath)
                if (!isFile) return null //not a file
                let found = _(src).find((s) => {
                    let key = keyGenFun(s) //fName from param
                    // console.log(TAG, f, key)
                    return f.indexOf(key) > -1
                })
                // console.log(TAG, fPath, found)
                return found ? mapperFun(dir, f, found) : orElseFun(dir, f)
            }).filter((o) => o).value()
        })
        return _.flatten(rest)
    }
}