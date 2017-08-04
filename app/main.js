const electron = require('electron')
const app = electron.app
// 创建窗口的模块
const BrowserWindow = electron.BrowserWindow
// 创建原生对话框
const dialog = electron.dialog
// 进程通信
const ipcMain = electron.ipcMain

// 保持一个全局的引用，以防被自动回收
let mainWindow //主窗口
let inputPortWindow //输入端口号窗口
let PORT = process.env.PORT || 55834

const path = require('path')
const url = require('url')
const net = require('net')
let log = require('./util/log').getLogger()

// 在electron初始化结束后悔调用，之后才能创建窗口以及使用一些API
app.on('ready', function () {
  // checkPort(PORT)
  require('./model/clawer/pixiv_clawer').claw('58133212', function (err, pixiv) {
    if (err) log.error(err)
    else pixiv.save()
  })
})

// Quit when all windows are closed.
// 窗口都关闭后退出程序
app.on('window-all-closed', function () {
  // 对于OS X用户，使用cmd+q后才退出应用
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // 对于OS X用户，点击dock图标来重建窗口
  if (mainWindow === null) {
    checkPort(PORT)
  }
})

//检测端口是否被占用
function checkPort (port) {
  // 尝试创建服务并监听该端口
  const server = net.createServer().listen(port)
  server.on('listening', function () { // 执行这块代码说明端口未被占用
    server.close() // 关闭服务
    log.info('The port【' + port + '】 is available.') // 控制台输出信息
    startServer(PORT)
  })

  server.on('error', function (err) {
    if (err.code === 'EADDRINUSE') { // 端口已经被使用
      console.log('The port【' + port + '】 is occupied, please change other port.')
      // 弹窗重新输入端口号
      inputPortWindow = new BrowserWindow({width: 300, height: 100})
      inputPortWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/port.html'),
        protocol: 'file:',
        slashes: true,
      }))
      // portInput.webContents.openDevTools()
      inputPortWindow.on('closed', function () {
        mainWindow = null
      })
    } else {
      dialog.showErrorBox('错误', '发生错误，请重新输入端口号')
    }
  })
}

//start server
function startServer (port) {
  require('./server')(port, createWindow)
}

//创建窗口
function createWindow () {
  // 创建窗口
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // 打开开发人员工具
  // mainWindow.webContents.openDevTools()

  // 渲染 index.html界面
  mainWindow.loadURL('http://127.0.0.1:' + PORT)

  // 关闭窗口时调用
  mainWindow.on('closed', function () {
    mainWindow = null
    inputPortWindow = null
  })
}

ipcMain.on('set-new-port', function (event, arg) {
  mainWindow = null
  inputPortWindow = null
  PORT = arg
  checkPort(arg)
})