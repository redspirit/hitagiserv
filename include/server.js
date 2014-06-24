/*
	Connection.js - запуск WS-сервера, чтение и отправка данных, поддержка связи с клиентом

	Date: 16.02.2014
	Author: Tayanchin Alexey
	Website: http://redspirit.ru/
*/

var router = require('./router.js');
var config = require('./../config.json');

var WebSocketServer = require('ws').Server;
var io;

exports.start = function(host, port){

    console.logf('Start started on port ' + port);
		
	io = new WebSocketServer({port: port, host: host});

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
				console.logf('Lost client: ' + sock.client_ip);
				sock.close();
			} else {
				sock.json_send({type:'ping'});
				sock.pinged = true;
			}
		}
	}, config.pingTimeout * 1000);


	
}

/*
    Подключение нового клиента
 */
function onConnection(socket){

	socket.id = tools.randomHash(16);
	socket.client_ip = socket._socket.remoteAddress;
	socket.profile = {};
	socket.isLogin = false;
	socket.pinged = false;
	socket.rooms = [];
	socket.json_send = function(m){
		if(m) socket.send(JSON.stringify(m));
	};
	
	socket.room_join = function(){

    }
	socket.room_leave = function(){

    }



}


/*
 Сообщение от клиента
 */
function onMessage(data){

	var jdata;
	
	try {
		jdata = JSON.parse(data);
	} catch(e) {
		jdata = false;
		console.logf('Bad JSON data');
	}
	
	if(jdata) router.rout(jdata, this);
	
}

/*
 Клиент отключается
 */
function onClose(){

	
}
