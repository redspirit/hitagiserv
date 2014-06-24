/*
	app.js - основной файл запуска сервера. Загружает конфиг, подключается к БД

	Date: 13.02.2014
	Author: Tayanchin Alexey
	Website: http://redspirit.ru/
*/

global.appPath = __dirname;
require('./include/logger.js');

var config = require('./config.json');
var data = require('./include/datamodel.js');
var WebSocketServer = require('ws').Server;

var server = require('./include/server.js');


server.start(config.server.host, config.server.port);

