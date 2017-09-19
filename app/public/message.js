let ipcRenderer = require('../util/my_ipc_renderer')

function send() {
  let channel = document.getElementById('channelIpt').value;
  let param = document.getElementById('paramTxt').value;
  let div = document.getElementById('resultDiv');
  ipcRenderer.send(channel, param, function (data) {
    div.innerHTML = JSON.stringify(data);
  })
}
document.getElementById('submitBtn').addEventListener('click',send)

