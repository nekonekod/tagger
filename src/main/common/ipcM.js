import {
    ipcMain
} from 'electron'

var log = console.log.bind(console)

export default {
    on: function(channel, handler) {
        let st = Date.now()
        ipcMain.on(channel, function(event, params) {
            let send = function(data) {
                event.sender.send(channel + '#reply#' + params.seq, data)
                let cost = (Date.now() - st) + ' ms'
                log('[ipcM.on]', channel, cost, ':\n[param]\n', params.arg, '\n[response]\n', data)
            }
            handler && handler(params.arg, send, event)
        })
    },
    onSync: function(channel, handler) {
        ipcMain.on(channel, function(event, params) {
            let val = handler(params, event);
            log('[ipcM.onSync]', channel, ':\n[param]\n', params, '\n[response]\n', val)
            e.returnValue = val
        })
    },
    push: function(channel, data) {
        log('[ipcM.push]', channel, '\n[data:]\n', data)
        global.storage.mainWindow.webContents.send(channel, data)
    }
}