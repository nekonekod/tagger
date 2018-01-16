import {
    ipcMain
} from 'electron'

var log = console.log.bind(console)

export default {
    on: function (channel, handler) {
        let st = Date.now()
        ipcMain.on(channel, function (event, params) {
            let send = function (data) {
                let cost = (Date.now() - st) + ' ms'
                log('** iipcM.on', channel, params.seq, '*', cost, params.arg, data)
                event.sender.send(channel + '#reply#' + params.seq, data)
            }
            handler && handler(params.arg, send, event)
        })
    },
    onSync: function (channel, handler) {
        ipcMain.on(channel, function (event, params) {
            log('ipcM.onSync', channel, params)
            e.returnValue = handler(params, event);
        })
    },
    push: function (channel, data) {
        log('ipcM.push', channel, data)
        global.storage.mainWindow.webContents.send(channel, data)
    }
}