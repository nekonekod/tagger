let IndexController = require('./controller/index_controller')
let ClawController = require('./controller/claw_controller')

module.exports = function(server) {
  //pre handle user
  server.use(function(req,res,next) {
    //选中当前导航 : header.jade
    res.locals.nav = req.path
    next()
  })

  //Index
  server.get('/', IndexController.index)
  server.get('/dash',IndexController.index)
  server.get('/search',IndexController.index)
  server.post('/claw/handler',ClawController.getHandler)
  server.get('/claw/:source',ClawController.showClaw)
}
