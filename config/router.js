var TagFileController = require('../app/controllers/tag_file_controller')

module.exports = function(app){
  app.get('/',function(req,res){
    res.render('index')
  })
  app.get('/resolve',TagFileController.resolve)
}