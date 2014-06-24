/*
	app.js - основной файл запуска сервера. Загружает конфиг, подключается к БД

	Date: 13.02.2014
	Author: Tayanchin Alexey
	Website: http://redspirit.ru/
*/


/*
var mongo = require('mongoskin');
var connection = require('./include/server.js');

global.config = require('./config.json');


var db = mongo.db(config.mongoServer+':'+config.mongoPort+'/'+config.mongoBaseName+'?auto_reconnect');
global.dbusers = db.collection('users');
global.dbmess = db.collection('messages');
global.dbrooms = db.collection('rooms');
global.dbhist = db.collection('history');

	
// Очищаем сокеты - все юзеры разлогинены
dbusers.update({'socket': {$ne:''}}, {$set: {'socket':''}}, {'multi':true});
// Очищаем комнаты от юзеров
dbrooms.update({}, {$set: {'userscount':0, 'users':{}}}, {'multi':true});

connection.start();

console.log('Start: '+config.serverName);
*/


var config = require('./config.json');
var WebSocketServer = require('ws').Server;

var io = new WebSocketServer({port: config.server.port, host: config.server.host});

io.on('connection', function(socket){
	onConnection(socket);
	socket.on('message', onMessage);
	socket.on('close', onClose);
});

function onConnection(socket){

	socket.client_ip = socket._socket.remoteAddress;
	socket.json_send = function(m){
		if(this) this.send(JSON.stringify(m));
	};

	console.log('New client: ' + socket.client_ip);


}

function onMessage(data){

	this.send('recive: ' + data);

}

function onClose(){



}

console.log('Start: '+config.serverName);