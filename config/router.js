

module.exports = function(app){
  app.get('/',function(req,res){
    console.log('123')
    res.render('index',{})
  })
}