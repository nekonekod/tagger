$(function () {
  const dropArea = document.getElementById('drop-area')
  dropArea.ondrop = (e) => {
    e.preventDefault()
    let temp = _.template('<tr><td>{{name}}</td><td>{{path}}</td><td>{{info}}</td></tr>')
    for (let f of e.dataTransfer.files) {
      console.log('File(s) you dragged here: ', f)
      let params = {name: f.name, path: f.path};
      getClawResult(params, (data) => {
        params.info = JSON.stringify(data)
        let html = temp(params)
        $('#view').append(html)
        console.log(data)
      })
    }
    return false
  }

  function getClawResult(params, cb) {
    $.post('/claw/handler', params).then(cb)
  }
})
