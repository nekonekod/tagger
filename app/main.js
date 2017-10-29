const electron = require('electron')
const app = electron.app
// 创建窗口的模块
const BrowserWindow = electron.BrowserWindow
// 创建原生对话框
const dialog = electron.dialog
// 进程通信
const ipcMain = electron.ipcMain

const path = require('path')
const url = require('url')
const net = require('net')


// 保持一个全局的引用，以防被自动回收
let mainWindow //主窗口

// 在electron初始化结束后会调用，之后才能创建窗口以及使用一些API
app.on('ready', function () {
  createWindow()
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
    createWindow()
  }
})


//创建窗口
function createWindow() {
  // 创建窗口
  mainWindow = new BrowserWindow({width: 1280, height: 720})

  // 渲染 进入主页 界面
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'public/find_img.html'),
    // pathname: path.join(__dirname, 'public/template/index.html'),
    protocol: 'file:',
    slashes: true,
  }))

  openDevTools()

  // 关闭窗口时调用
  mainWindow.on('closed', () => {
    mainWindow = null
    inputPortWindow = null
  })
}

ipcMain.on('open-dev-tools', (e, args) => openDevTools())

function openDevTools() {
  // 打开开发人员工具
  mainWindow.webContents.openDevTools()
}

require('./controller/router')
