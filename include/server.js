/*
 Server.js - запуск WS-сервера, чтение и отправка данных, поддержка связи с клиентом

 Date: 16.02.2014
 Author: Tayanchin Alexey
 Website: http://redspirit.ru/
 */

var router = require('./router.js');
var data = require('./datamodel.js');
var config = require('./../config.json');

var WebSocketServer = require('ws').Server;
var io;
var rooms = {}

exports.start = function (host, port) {

    console.logf('Start started on port ' + port);

    io = new WebSocketServer({port: port, host: host});

    io.on('connection', function (socket) {
        onConnection(socket);
        socket.on('message', onMessage);
        socket.on('close', onClose);
    });

    io.send_room = function (name, data) {
        for (var i in rooms[name]) {
            rooms[name][i].json_send(data);
        }
    }

    // todo вернуть все комнаты указанного юзера
    // todo вернуть всех юзеров указанной комнаты





    // пинг-понг таймер
    setInterval(function () {
        for (var i in io.clients) {
            var sock = io.clients[i];
            if (sock.pinged) {
                console.logf('Lost client: ' + sock.client_ip);
                sock.close();
            } else {
                sock.json_send({type: 'ping'});
                sock.pinged = true;
            }
        }
    }, config.pingTimeout * 1000);


}

/*
 Подключение нового клиента
 */
function onConnection(socket) {

    socket.id = data.randomHash(16);
    socket.client_ip = socket._socket.remoteAddress;
    socket.profile = {};
    socket.isLogin = false;
    socket.pinged = false;
    socket.json_send = function (m) {
        if (m) socket.send(JSON.stringify(m));
    };

    socket.room_join = function (name) {
        if (!rooms[name]) rooms[name] = {};
        rooms[name][socket.id] = socket;
    }

    socket.room_leave = function (name) {
        delete rooms[name][socket.id];
    }


}


/*
 Сообщение от клиента
 */
function onMessage(data) {

    var jdata = false;

    try {
        jdata = JSON.parse(data);
    } catch (e) {
        console.logf('Bad JSON data');
    }

    if (jdata) router.rout(jdata, this);

}

/*
 Клиент отключается
 */
function onClose() {

    var id = this.id;

    for (var i in rooms) {
        if(rooms[i][id]) {
            delete rooms[i][id];
        }
    }

}
