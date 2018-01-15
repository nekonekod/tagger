let chokidar = require('chokidar')
let log = console.log.bind(console)
let watcher = chokidar.watch([], {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    // disableGlobbing:true,
    followSymlinks:false
});
watcher.on('addDir', path => {
    log(`Directory ${path} has been added`)
})
.on('unlinkDir', path => {
    log(`Directory ${path} has been removed`)
})
.on('error', error => log(`Watcher error: ${error}`))
.on('ready', () => log('Initial scan complete. Ready for changes'))
.on('raw', (event, path, details) => {
    setTimeout(()=>{log(watcher.getWatched())},1000)
    log('Raw event info:', event, path, details);
});

watcher.add('/Users/nekod/Pictures/pixiv')
watcher.add('/Users/nekod/Pictures/fake')

setTimeout(()=>{
    log('++++++++++++++++')
    log('unwatch')
    log(watcher.getWatched())
    watcher.unwatch('/Users/nekod/Pictures/fake')
},2000)

setTimeout(()=>{
    log('++++++++++++++++')
    log('keys')
    log(watcher.getWatched())
},4000)

