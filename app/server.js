let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')
let moment = require('moment')
let logger = require('morgan')
let server = express()

module.exports = function (PORT) {
  server.set('views', __dirname + '/views/pages')
  server.set('view engine', 'jade')

  // use body-parser to grab infor from POST
  server.use(bodyParser.urlencoded({extended: true}))
  server.use(bodyParser.json())
  server.locals.moment = moment

  server.use(express.static(path.join(__dirname, 'public')))

  if ('development' === server.get('env')) {
    server.set('showStackErr', true)
    server.use(logger(':method :url :status'))
    server.locals.pretty = true
  }

  require('./routes')(server)
  server.listen(PORT)

  console.log('server start on port ' + PORT)
}

