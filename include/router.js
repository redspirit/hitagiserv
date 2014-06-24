/*
	Router.js - распределение запросов от клиента на выполнение

	Date: 16.02.2014
	Author: Tayanchin Alexey
	Website: http://redspirit.ru/
*/

var tools = require('./tools.js');
var auth = require('./auth.js');

var ways = {
	'pong': function(data, s){ s.pinged = false; },     // обработка пинга
	'register': auth.register
}

exports.rout = function(data, socket){
	var mtype = data['type'];
	
	if(tools.isset(mtype)){
		if(typeof(ways[mtype])=='function') 
			ways[mtype](data, socket);
		else
			socket.json_send({'type':'error', 'reason':'unknowncommand'});
	}
	
}






