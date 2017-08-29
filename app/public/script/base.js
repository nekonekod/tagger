const _ = require('underscore')
const {ipcRenderer} = require('electron')

//- 解决electron和jquery冲突
if (typeof module === 'object') {
  window.jQuery = window.$ = module.exports
}
$(function () {
  //阻止拖拽时的默认行为
  document.ondragenter =
    document.ondragover =
      document.ondragleave =
        document.ondrop =
          (e) => e.preventDefault()
  //打开开发者工具
  document.getElementById('open-dev-tools').addEventListener('click', () => {
    ipcRenderer.send('open-dev-tools')
  })
})
//替换underscore原来的插值符号为{{}}
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
}
