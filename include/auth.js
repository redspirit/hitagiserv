/*
	Auth.js - регистация и авторизация пользователей

	Date: 17.02.2014
	Author: Tayanchin Alexey
	Website: http://redspirit.ru/
*/

var tools = require('./tools.js');

function registerUser(param, s){
	var login = wrap(param['login']);
	var nick = wrap(param['nickname']);	
	var pass = wrap(param['pass']);

	if(s.isLogin){
		sendError('alreadyauth', s);
		return false;
	}	
	
	// Проверка на заблокированые слова
	var bs = config.busyNames.split('|');
	for(var i=0; i<bs.length-1; i++){
		if(bs[i] == login || bs[i] == nick){
			sendError('busynicklogin', s);
			return false;
		}
	}
	
	/* Проверка введенных данных для регистрации */
	if(pass.length != 40) {
		sendError('wrongpass', s);
		return false;
	}
	
	if(!/^[\w-]{3,15}$/i.test(login)){
		sendError('wronglogin', s);
		return false;		
	}
	
	if(nick.length < 3 || nick.length > config.maxNickLength){
		sendError('wrongnick', s);
		return false;				
	}
	
	/* TODO: Проверка юзера на IP бан*/
	
	dbusers.findOne({'login':login}, function(err, result){
		if(!result){
			dbusers.findOne({'nick':nick}, function(err, result){
				if(!result){
				
					/* Записываем данные юзера в базу */
					var newuser = {
						'login':login,
						'nick':nick,
						'pass':pass,
						'socket':'',
						'ip':s.client_ip,
						'reg_date': tools.time(),
						'statustext':'',
						'state':0,
						'privilege':2,
						'gender':0,
						'block_reason':'',
						'last_login':0,
						'ava_index':0,
						'vk_id':0,
						'client':0,
						'rating':0,
						'mess_count': 0,
						'textcolor':'#000',
						'block':0, // - заблокирован ли юзер 0 - нет, 1 - да
						'profile_visible':1 // - профиль видят только зареганные
					};
					
					dbusers.insert(newuser, function(err, result){
						/* уведомляем клиента */
						s.json_send({'type':'register', 'status':'ok'});
					});						
				} else {
					sendError('busynick', s);
				}
			});
		} else {
			sendError('busylogin', s);
		}
	});

}


function sendError(reason, s){
	s.json_send({'type':'register', 'status':'error', 'reason':reason});
}

exports.register = registerUser;