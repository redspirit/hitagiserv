/*
	app.js - основной файл запуска сервера. Загружает конфиг, подключается к БД

	Date: 13.02.2014
	Author: Tayanchin Alexey
	Website: http://redspirit.ru/
*/

global.appPath = __dirname;
require('./include/logger.js');

var config = require('./config.json');
var server = require('./include/server.js');
var mail = require('./include/mail.js');


//server.start(config.server.host, config.server.port);

mail.send('redspirit@live.ru', 'Sample subject', '<p>Hello world <br> привет всем!</p>');