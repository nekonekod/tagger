const electron = require('electron')
const ipcMain = electron.ipcMain
let logger = require('./logger').logger(__filename)

module.exports = {
  on: function (channel, handler) {
    ipcMain.on(channel, function (event, params) {
      logger.info('ipc-main request:', channel, params)
      let send = function (data) {
        logger.info('ipc-main response:', channel, data)
        event.sender.send(channel + '-reply', data)
      }
      handler && handler(params, send, event)
    })
  },
  onSync: function (channel, handler) {
    ipcMain.on(channel, function (event, params) {
      e.returnValue = handler(params, event);
    })
  }
}
