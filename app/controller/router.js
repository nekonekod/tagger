let myIpcMain = require('../util/my_ipc_main')
let testController = require('./test_controller')
let illustController = require('./illust_contoller')
let fsController = require('./fs_controller')


myIpcMain.on('echo', testController.echo)
myIpcMain.on('illust', illustController.illust)
myIpcMain.on('pixiv/claw', illustController.clawPixiv)
myIpcMain.on('fslistener/search', fsController.search)
myIpcMain.on('fslistener/watch/bind', fsController.bindWatch)