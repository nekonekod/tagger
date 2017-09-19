const electron = require('electron')
const ipcRenderer = electron.ipcRenderer

module.exports = {
  send: function (channel, arg, callback) {
    ipcRenderer.send(channel, arg)
    ipcRenderer.once(channel + '-reply', function (event, data) {
      callback && callback(data, event)
    })
  },
  sendSync: function (channel, arg) {
    return ipcRenderer.sendSync(channel, arg)
  }
}
