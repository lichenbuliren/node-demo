module.exports = function(app){
	/*
	 * GET home page.
	 */
	app.get('/',function(req,res){
		res.render('index.html',{
			'title':'node-demo'
		});
	});
}