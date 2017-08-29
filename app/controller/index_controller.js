let log = require('../util/log').getLogger(__filename)

exports.index = function (req, res) {
  log.info('index_controller index')
  res.render('index')
}
