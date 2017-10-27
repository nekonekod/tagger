let ipcRenderer = require('../../util/my_ipc_renderer')
// let Vue = require('vue')

let menuLibrary = new Vue({
  el: '#menu-library',
  methods: {
    allIllust: function () {
      ipcRenderer.send('illust', {}, (data) => {
        alert(data)
      })
    },
    pixivClaw: function () {
      ipcRenderer.send('pixiv/claw', '61431282', (data) => {
        alert(JSON.stringify(data))
      })
    }
  }
})
