import chokidar from 'chokidar'
import ipcM from '../common/ipcM'

var watcher = chokidar.watch([], {
    ignored: /(^|[\/\\])\../,
    persistent: true
});

watcher.on('addDir', path => {
        ipcM.push('watchedDirs', watcher.getWatched())
        log(`Directory ${path} has been added`)
    })
    .on('unlinkDir', path => {
        log(`Directory ${path} has been removed`)
    })
    .on('error', error => log(`Watcher error: ${error}`))
    .on('ready', () => log('Initial scan complete. Ready for changes'))
    .on('raw', (event, path, details) => {
        log('Raw event info:', event, path, details);
    });

export default {
    register(path) {
        watcher.add(path)
    },
    unregister(path) {
        watcher.unwatch(path)
    },
    watchedDirs() {
        return Object.keys(watcher.getWatched())
    }
}