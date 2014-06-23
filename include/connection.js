/*
	Connection.js - запуск WS-сервера, чтение и отправка данных, поддержка связи с клиентом

	Date: 16.02.2014
	Author: Tayanchin Alexey
	Website: http://redspirit.ru/
*/

var WebSocketServer = require('ws').Server;
var tools = require('./tools.js');
var router = require('./router.js');

exports.start = function(){
		
	tools.fileLog('Server started');	
		
	global.io = new WebSocketServer({port: config.socketPort, host: config.serverHost});
	io.sks = {}; // массив с сокетами всех клиентов	

	io.on('connection', function(socket){
		onConnection(socket);
		socket.on('message', onMessage);
		socket.on('close', onClose);
	});
	

	// пинг-понг таймер
	setInterval(function(){
		for(var i in io.clients){
			var sock = io.clients[i];
			if(sock.pinged){
				tools.fileLog('Lost client: ' + sock.client_ip);
				sock.close();
			} else {
				sock.json_send({type:'ping'});
				sock.pinged = true;	
			}			
		}
	}, config.pingTimeout*1000);


	
}


function onConnection(socket){

	socket.id = tools.randomHash(16);
	socket.client_ip = socket._socket.remoteAddress;
	socket.profile = {};
	socket.isLogin = false;
	socket.pinged = false;
	socket.rooms = [];
	socket.json_send = function(m){
		if(this) this.send(JSON.stringify(m));
	};
	
	io.sks[socket.id] = socket;
	
}

function onMessage(data){

	var jdata;
	
	try {
		jdata = JSON.parse(data);
	} catch(e) {
		jdata = false;
		tools.fileLog('Bad JSON data');
	}
	
	if(jdata) router.rout(jdata, this);
	
}

function onClose(){
	
	delete io.sks[this.id];
	
}
