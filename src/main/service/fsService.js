import fswatcher from '../common/fswatcher'

export default {
    ipcRegister(param, send) {
        fswatcher.register(param.path)
        send({
            status: 1
        })
    },
    ipcUnregister(param, send) {
        fswatcher.unregister(param.path)
        send({
            status: 1
        })
    },
    ipcWatchedDirs(param, send){
        send({
            data:fswatcher.watchedDirs(),
            status: 1
        })
    }
}