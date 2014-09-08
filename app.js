
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var MongoStore = require('connect-mongo')(express);
var flash = require('connect-flash');

//系统配置信息
var config = require('./config.js');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

//app.set('view engine', 'ejs');
//change default template to .html
app.engine('.html',require('ejs').__express);
app.set('view engine','html');

//提示信息组件
app.use(flash());

//设置默认的图标，如果要改为自己的
// app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.favicon());
app.use(express.logger('dev'));

//app.use(express.json());
//app.use(express.urlencoded());
app.use(express.bodyParser({keepExtensions:true,uploadDir:'./public/images'}));
app.use(express.methodOverride());

app.use(express.cookieParser());

//use session
app.use(express.session({
	secret: config.cookieSecret,
	key: config.db,
	cookie: {maxAge: 1000*60*60^24*30},
	//the db config
	store: new MongoStore({
		db: config.db
//		host: config.host,
//		username: config.username,
//		password: config.password
	})
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//路由控制器
routes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
