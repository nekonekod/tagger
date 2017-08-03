const electron = require('electron')
const app = electron.app
// 创建窗口的模块
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// 保持一个全局的引用，以防被自动回收
let mainWindow
let PORT = process.env.PORT || 3004

require('./web/server')(PORT)

function createWindow () {
  // 创建窗口
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // 打开开发人员工具
  mainWindow.webContents.openDevTools()

  // 渲染 index.html界面
  mainWindow.loadURL('http://127.0.0.1:' + PORT)

  // 关闭窗口时调用
  mainWindow.on('closed', function () {
    // 释放窗口的引用，如果是多窗口的引用，应该使用一个数组来维护引用
    mainWindow = null
  })
}

// 在electron初始化结束后悔调用，之后才能创建窗口以及使用一些API
app.on('ready', createWindow)

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

