import {
    ipcRenderer
} from 'electron'
import uuid from 'uuid/v4'

var log = console.log.bind(console)

export default {
    send(channel, params, callback) {
        let st = Date.now()
        if (typeof params === 'function') {
            callback = params
            params = {}
        }
        let seq = uuid().substr(0, 8)
        ipcRenderer.send(channel, {
            seq: seq,
            arg: params
        })
        if (callback) {
            ipcRenderer.once(channel + '#reply#' + seq, function(event, data) {
                let cost = (Date.now() - st) + ' ms'
                log('[ipcR.send]', channel, ':', cost, params, data)
                callback && callback(data, event)
            })
        } else {
            log('[ipcR.send]', channel, ':', params)
        }
    },
    sendSync(channel, params) {
        log('[ipcR.sendSync]', channel, params)
        return ipcRenderer.sendSync(channel, params)
    },
    recieve(channel, callback) {
        ipcRenderer.on(channel, function(event, data) {
            log('[ipcR.recieve]', channel, data)
            callback && callback(data, event)
        })
    }
}