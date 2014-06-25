/*
    Router.js - распределение запросов от клиента на выполнение

    Date: 16.02.2014
    Author: Tayanchin Alexey
    Website: http://redspirit.ru/
*/

var auth = require('./auth.js');


var ways = {
    'pong': pinger,
    'register': auth.register
}




// обработка пинга

function pinger(data, s) {
    s.pinged = false;
}

exports.rout = function (data, socket) {
    var mtype = data['type'];

    if (mtype) {
        if (typeof(ways[mtype]) == 'function')
            ways[mtype](data, socket);
        else
            socket.json_send({'type': 'error', 'reason': 'unknowncommand'});
    }

}






