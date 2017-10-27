let pixivClawer = require('../model/pixiv/pixiv_clawer')

exports.illust = function (param, send) {
  let res = [
    {
      id: '61431282',
      member: '太もも',
      memberId: '8413186',
      tags:
        ['插畫']
    }, {
      id: '61431282',
      member: '大腿外側(太もも',
      memberId: '8413186',
      tags:
        [
          '艦これかわいい',
          '艦娘',
          '艦これ100users入り']
    }, {
      id: '61431282',
      member: '大腿外側(太もも',
      memberId: '8413186',
      tags:
        [
          '少女',
          '艦これ',
          '艦隊これくしょん',
          '如月(艦隊これくしょん)']
    }]
  send(res)
}

exports.clawPixiv = function (param, send, event) {
  pixivClawer.claw(param)
    .then((data) => {
      send(data)
    })
}
