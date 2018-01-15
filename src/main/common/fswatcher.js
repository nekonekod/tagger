import chokidar from 'chokidar'
import ipcM from '../common/ipcM'
import _ from 'lodash'

let log = console.log.bind(console)

let watcher = chokidar.watch([], {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    disableGlobbing:true,
    followSymlinks:false
});

let ignoredDirs = []

watcher.on('addDir', path => {
        pushWatchedDirs()
        log(`Directory ${path} has been added`)
    })
    .on('unlinkDir', path => {
        pushWatchedDirs()
        log(`Directory ${path} has been removed`)
    })
    .on('error', error => log(`Watcher error: ${error}`))
    .on('ready', () => log('Initial scan complete. Ready for changes'))
    .on('raw', (event, path, details) => {
        log('Raw event info:', event, path, details);
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
        watcher.add(path)
    },
    // unregister(path) {
    //     log('unwatch:', path)
    //     watcher.unwatch(path)
    // },
    watchedDirs() {
        return watchedDirs()
    }
}