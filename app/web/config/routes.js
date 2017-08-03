let IndexController = require('../controller/index_controller')

module.exports = function(server) {
  //pre handle user
  server.use(function(req,res,next) {
    next()
  })

  //Index
  server.get('/', IndexController.index)
}
