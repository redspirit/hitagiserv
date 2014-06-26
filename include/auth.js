/*
	Auth.js - OAuth 2.0 регистация и авторизация пользователей

	Date: 17.02.2014
	Author: Tayanchin Alexey
	Website: http://redspirit.ru/
*/


var data = require('./datamodel.js');
var config = require('./../config.json');


function Register(param, s){
    var login = def(param.login);
    var nick  = def(param.nick);
    var pass  = def(param.pass);

    if(s.isLogin){
        s.send_err('register', 'already_auth');
        return;
    }

    // Проверка на заблокированые слова
    var bs = config.busyNames.split('|');
    for(var i = 0; i < bs.length - 1; i++) {
        if(bs[i] == login || bs[i] == nick){
            s.send_err('register', 'busy_nick_login');
            return;
        }
    }

    /// Проверка введенных данных для регистрации
    if(pass.length != 32) {
        s.send_err('register','wrong_pass');
        return;
    }

    if(!/^[\w-]{3,15}$/i.test(login)){
        s.send_err('register','wrong_login');
        return;
    }

    if(nick.length < 3 || nick.length > config.maxNickLength){
        s.send_err('register', 'wrong_nick');
        return;
    }


    // TODO: Проверка юзера на IP бан


    data.User.findOne({'login': login}, function(err, result){
        if (result) {
            s.send_err('register', 'busy_login');
        } else {
            data.User.findOne({'nick': nick}, function(err, result){
                if (result) {
                    s.send_err('register', 'busy_nick');
                } else {

                    var profile = {
                        "birthday": 0,
                        "country": "",
                        "email": "",
                        "facebook": "",
                        "gender": 0,
                        "homepage": "",
                        "icq": "",
                        "phone": "",
                        "realname": "",
                        "skype": "",
                        "twitter": "",
                        "vk": ""
                    }

                    var user = new data.User({
                        'login': login,
                        'nick': nick,
                        'pass': pass,
                        'ip': s.client_ip,
                        'privilege': 2,
                        'profile': profile
                    });

                    user.save(function(err, doc){
                        if(err) {
                            s.send_err('register', 'create_error');
                        } else {
                            s.send_ok('register', {});
                        }
                    });


                }
            });
        }
    });

}

function Password(param, s){
    var login = def(param.login);
    var nick = def(param.nickname);
    var pass = def(param.pass);
    var client = def(param.client);


	if(pass.length != 32) {
		s.send_err('password','wrong_pass_format');
		return;
	}

    data.User.findOne({'login':login, 'pass':pass}, function(err, doc){
        if(doc) {

            if(doc.block == 1) {
                s.json_send({'type':'auth', 'status':'error', 'reason':'user_blocked','message': doc.block_reason});
                return;
            }

            doc.last_login = data.timestamp();
            doc.client = client;
            doc.ip = s.client_ip;
            doc.save();


			// todo возможно эти данные не нужно запоминать
            s.isLogin = true;
            s.user.login = login;
            s.user.nick = doc.nick;
            s.user.privilege = doc.privilege;
            s.user.client = client;
            s.user.ava_index = doc.ava_index;
            s.user.statustext = doc.statustext;
            s.user.state = doc.state;
            s.user.profile_visible = doc.profile_visible;
            s.user.nick_date = doc.nick_date;
            s.user.lastmess = {};
            s.user.avaurl = 'http://' + config.server.host + ':' + config.server.port + '/avatar/' + login + '?' + doc.ava_index;
            s.user.profile = doc.profile;

            nicks[login] = doc.nick;

            s.send_ok('password', {
                'login':login,
                'privilege': doc.privilege,
                'nickname': doc.nick,
                'statustext': doc.statustext,
                'state': doc.state,
                'textcolor': doc.textcolor,
                'avaurl': s.user.avaurl
            });


        } else {
            s.send_err('password', 'wrong_auth');
        }
    });






}


exports.register = Register;
exports.password = Password;