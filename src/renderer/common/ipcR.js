import {
    ipcRenderer
} from 'electron'
import uuid from 'uuid/v4'

var log = console.log.bind(console)

export default {
    send(channel, params, callback) {
        if (typeof params === 'function') {
            callback = params
            params = {}
        }
        let seq = uuid().substr(0,8)
        ipcRenderer.send(channel, {
            seq: seq,
            arg: params
        })
        ipcRenderer.once(channel + '#reply#' + seq, function (event, data) {
            log('*** ipcR.send', channel, seq, ' ***', params, data)
            callback && callback(data, event)
        })
    },
    sendSync(channel, params) {
        log('ipcR.sendSync', channel, params)
        return ipcRenderer.sendSync(channel, params)
    },
    recieve(channel, callback) {
        ipcRenderer.on(channel, function (event, data) {
            log('ipcR.recieve', channel, data)
            callback && callback(data, event)
        })
    }
}