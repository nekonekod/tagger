import fswatcher from '../common/fswatcher'

export default {
    register(param, send) {
        fswatcher.register(param.path)
        send({
            status: 1
        })
    },
    unregister(param, send) {
        fswatcher.unregister(param.path)
        send({
            status: 1
        })
    },
    watchedDirs(param, send){
        send({
            data:fswatcher.watchedDirs(),
            status: 1
        })
    }
}