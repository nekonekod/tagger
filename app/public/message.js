let ipcRenderer = require('../util/my_ipc_renderer')

function send() {
  let channel = document.getElementById('channelIpt').value;
  let param = document.getElementById('paramTxt').value;
  let pre = document.getElementById('resultPre');
  ipcRenderer.send(channel, param, function (data) {
    pre.innerHTML = JSON.stringify(data,undefined,2);
  })
}

document.getElementById('submitBtn').addEventListener('click',send)

