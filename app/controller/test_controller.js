let myIpcMain = require('../util/my_ipc_main')
let pixivClawer = require('../model/pixiv/pixiv_clawer')

myIpcMain.on('echo', function (param) {
  return 'echo:' + param
})


myIpcMain.on('pixiv/claw', function (param, send, event) {
  pixivClawer.claw(param)
    .then((data) => {
      send(data)
    })
})
