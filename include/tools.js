/*
	Tools.js - дополнительные функции

	Date: 14.02.2014
	Author: Tayanchin Alexey
	Website: http://redspirit.ru/
*/

var fs = require('fs');


// поиск юзеров (их сокетов) по полям профиля
function findClientsBy(field){
	
}





exports.fileLog = function(message){
	var d = date2(config.dateFormat+' '+config.timeFormat, time());
	fs.appendFile(config.serverDir + '/errors.log', d + ': ' + message + "\r\n"); 	
}

function time(){return parseInt(new Date().getTime()/1000)};

exports.time = time;
function isset(vr){return typeof(vr)!=='undefined'};
exports.obLen = function(ob){var cc=0; for(var i in ob) cc++; return cc};
exports.obj2arr = function(ob){var ar=[]; for(var i in ob) ar.push(i); return ar};
exports.randomHash = function(){return function(c){for(var a="",b=0;b<c;b++)a+="AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890"[Math.floor(62*Math.random())];return a}}();

exports.wrap = function(par){return isset(par) ? par : '';}
exports.isset = isset;

exports.base64_decode = function(f){var k,h,e,g,l,m=0,s="";do k="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(f.charAt(m++)),h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(f.charAt(m++)),g="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(f.charAt(m++)),l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(f.charAt(m++)),e=k<<18|h<<12|g<<6|l,k=e>>16&255,h=e>>8&255,e&=255,s=64==g?s+String.fromCharCode(k):
64==l?s+String.fromCharCode(k,h):s+String.fromCharCode(k,h,e);while(m<f.length);return s}

function date2(f,k){var h,e,g=/\\?([a-z])/gi,l,m=function(e,f){return(e+="").length<f?Array(++f-e.length).join("0")+e:e},s="Sun Mon Tues Wednes Thurs Fri Satur January February March April May June July August September October November December".split(" ");l=function(f,g){return e[f]?e[f]():g};e={d:function(){return m(e.j(),2)},D:function(){return e.l().slice(0,3)},j:function(){return h.getDate()},l:function(){return s[e.w()]+"day"},N:function(){return e.w()||7},S:function(){var f=e.j();return 4<
f&&21>f?"th":{1:"st",2:"nd",3:"rd"}[f%10]||"th"},w:function(){return h.getDay()},z:function(){var f=new Date(e.Y(),e.n()-1,e.j()),g=new Date(e.Y(),0,1);return Math.round((f-g)/864E5)+1},W:function(){var f=new Date(e.Y(),e.n()-1,e.j()-e.N()+3),g=new Date(f.getFullYear(),0,4);return m(1+Math.round((f-g)/864E5/7),2)},F:function(){return s[6+e.n()]},m:function(){return m(e.n(),2)},M:function(){return e.F().slice(0,3)},n:function(){return h.getMonth()+1},t:function(){return(new Date(e.Y(),e.n(),0)).getDate()},
L:function(){return 1===(new Date(e.Y(),1,29)).getMonth()|0},o:function(){var f=e.n(),g=e.W();return e.Y()+(12===f&&9>g?-1:1===f&&9<g)},Y:function(){return h.getFullYear()},y:function(){return(e.Y()+"").slice(-2)},a:function(){return 11<h.getHours()?"pm":"am"},A:function(){return e.a().toUpperCase()},B:function(){var e=3600*h.getUTCHours(),f=60*h.getUTCMinutes(),g=h.getUTCSeconds();return m(Math.floor((e+f+g+3600)/86.4)%1E3,3)},g:function(){return e.G()%12||12},G:function(){return h.getHours()},h:function(){return m(e.g(),
2)},H:function(){return m(e.G(),2)},i:function(){return m(h.getMinutes(),2)},s:function(){return m(h.getSeconds(),2)},u:function(){return m(1E3*h.getMilliseconds(),6)},e:function(){throw"Not supported (see source code of date() for timezone on how to add support)";},I:function(){var f=new Date(e.Y(),0),g=Date.UTC(e.Y(),0),h=new Date(e.Y(),6),k=Date.UTC(e.Y(),6);return 0+(f-g!==h-k)},O:function(){var e=h.getTimezoneOffset(),f=Math.abs(e);return(0<e?"-":"+")+m(100*Math.floor(f/60)+f%60,4)},P:function(){var f=
e.O();return f.substr(0,3)+":"+f.substr(3,2)},T:function(){return"UTC"},Z:function(){return 60*-h.getTimezoneOffset()},c:function(){return"Y-m-d\\Th:i:sP".replace(g,l)},r:function(){return"D, d M Y H:i:s O".replace(g,l)},U:function(){return h.getTime()/1E3|0}};this.date=function(e,f){h="undefined"===typeof f?new Date:f instanceof Date?new Date(f):new Date(1E3*f);return e.replace(g,l)};return this.date(f,k)}
exports.date = date2;

exports.sha1 = function(f){function k(e,f){return e<<f|e>>>32-f}function h(e){var f="",g,h;for(g=7;0<=g;g--)h=e>>>4*g&15,f+=h.toString(16);return f}var e,g,l=Array(80),m=1732584193,s=4023233417,v=2562383102,w=271733878,y=3285377520,n,q,r,t,u;e=f.replace(/\r\n/g,"\n");for(var p="",f=0;f<e.length;f++)g=e.charCodeAt(f),128>g?p+=String.fromCharCode(g):(127<g&&2048>g?p+=String.fromCharCode(g>>6|192):(p+=String.fromCharCode(g>>12|224),p+=String.fromCharCode(g>>6&63|128)),p+=String.fromCharCode(g&63|128));f=p;n=f.length;
p=[];for(e=0;e<n-3;e+=4)g=f.charCodeAt(e)<<24|f.charCodeAt(e+1)<<16|f.charCodeAt(e+2)<<8|f.charCodeAt(e+3),p.push(g);switch(n%4){case 0:e=2147483648;break;case 1:e=f.charCodeAt(n-1)<<24|8388608;break;case 2:e=f.charCodeAt(n-2)<<24|f.charCodeAt(n-1)<<16|32768;break;case 3:e=f.charCodeAt(n-3)<<24|f.charCodeAt(n-2)<<16|f.charCodeAt(n-1)<<8|128}for(p.push(e);14!=p.length%16;)p.push(0);p.push(n>>>29);p.push(n<<3&4294967295);for(f=0;f<p.length;f+=16){for(e=0;16>e;e++)l[e]=p[f+e];for(e=16;79>=e;e++)l[e]=
k(l[e-3]^l[e-8]^l[e-14]^l[e-16],1);g=m;n=s;q=v;r=w;t=y;for(e=0;19>=e;e++)u=k(g,5)+(n&q|~n&r)+t+l[e]+1518500249&4294967295,t=r,r=q,q=k(n,30),n=g,g=u;for(e=20;39>=e;e++)u=k(g,5)+(n^q^r)+t+l[e]+1859775393&4294967295,t=r,r=q,q=k(n,30),n=g,g=u;for(e=40;59>=e;e++)u=k(g,5)+(n&q|n&r|q&r)+t+l[e]+2400959708&4294967295,t=r,r=q,q=k(n,30),n=g,g=u;for(e=60;79>=e;e++)u=k(g,5)+(n^q^r)+t+l[e]+3395469782&4294967295,t=r,r=q,q=k(n,30),n=g,g=u;m=m+g&4294967295;s=s+n&4294967295;v=v+q&4294967295;w=w+r&4294967295;y=y+t&
4294967295}u=h(m)+h(s)+h(v)+h(w)+h(y);return u.toLowerCase()}

function str2blks_MD5(f){nblk=(f.length+8>>6)+1;blks=Array(16*nblk);for(i=0;i<16*nblk;i++)blks[i]=0;for(i=0;i<f.length;i++)blks[i>>2]|=f.charCodeAt(i)<<8*(i%4);blks[i>>2]|=128<<8*(i%4);blks[16*nblk-2]=8*f.length;return blks}function add(f,k){var h=(f&65535)+(k&65535);return(f>>16)+(k>>16)+(h>>16)<<16|h&65535}function rol(f,k){return f<<k|f>>>32-k}function cmn(f,k,h,e,g,l){return add(rol(add(add(k,f),add(e,l)),g),h)}function ff(f,k,h,e,g,l,m){return cmn(k&h|~k&e,f,k,g,l,m)}

function gg(f,k,h,e,g,l,m){return cmn(k&e|h&~e,f,k,g,l,m)}function hh(f,k,h,e,g,l,m){return cmn(k^h^e,f,k,g,l,m)}function ii(f,k,h,e,g,l,m){return cmn(h^(k|~e),f,k,g,l,m)}

exports.md5 = function(f){x=str2blks_MD5(f);a=1732584193;b=-271733879;c=-1732584194;d=271733878;for(i=0;i<x.length;i+=16)olda=a,oldb=b,oldc=c,oldd=d,a=ff(a,b,c,d,x[i+0],7,-680876936),d=ff(d,a,b,c,x[i+1],12,-389564586),c=ff(c,d,a,b,x[i+2],17,606105819),b=ff(b,c,d,a,x[i+3],22,-1044525330),a=ff(a,b,c,d,x[i+4],7,-176418897),d=ff(d,a,b,c,x[i+5],12,1200080426),c=ff(c,d,a,b,x[i+6],17,-1473231341),b=ff(b,c,d,a,x[i+7],22,-45705983),a=ff(a,b,c,d,x[i+8],7,1770035416),d=ff(d,a,b,c,x[i+9],12,-1958414417),c=ff(c,d,a,
b,x[i+10],17,-42063),b=ff(b,c,d,a,x[i+11],22,-1990404162),a=ff(a,b,c,d,x[i+12],7,1804603682),d=ff(d,a,b,c,x[i+13],12,-40341101),c=ff(c,d,a,b,x[i+14],17,-1502002290),b=ff(b,c,d,a,x[i+15],22,1236535329),a=gg(a,b,c,d,x[i+1],5,-165796510),d=gg(d,a,b,c,x[i+6],9,-1069501632),c=gg(c,d,a,b,x[i+11],14,643717713),b=gg(b,c,d,a,x[i+0],20,-373897302),a=gg(a,b,c,d,x[i+5],5,-701558691),d=gg(d,a,b,c,x[i+10],9,38016083),c=gg(c,d,a,b,x[i+15],14,-660478335),b=gg(b,c,d,a,x[i+4],20,-405537848),a=gg(a,b,c,d,x[i+9],5,568446438),
d=gg(d,a,b,c,x[i+14],9,-1019803690),c=gg(c,d,a,b,x[i+3],14,-187363961),b=gg(b,c,d,a,x[i+8],20,1163531501),a=gg(a,b,c,d,x[i+13],5,-1444681467),d=gg(d,a,b,c,x[i+2],9,-51403784),c=gg(c,d,a,b,x[i+7],14,1735328473),b=gg(b,c,d,a,x[i+12],20,-1926607734),a=hh(a,b,c,d,x[i+5],4,-378558),d=hh(d,a,b,c,x[i+8],11,-2022574463),c=hh(c,d,a,b,x[i+11],16,1839030562),b=hh(b,c,d,a,x[i+14],23,-35309556),a=hh(a,b,c,d,x[i+1],4,-1530992060),d=hh(d,a,b,c,x[i+4],11,1272893353),c=hh(c,d,a,b,x[i+7],16,-155497632),b=hh(b,c,d,
a,x[i+10],23,-1094730640),a=hh(a,b,c,d,x[i+13],4,681279174),d=hh(d,a,b,c,x[i+0],11,-358537222),c=hh(c,d,a,b,x[i+3],16,-722521979),b=hh(b,c,d,a,x[i+6],23,76029189),a=hh(a,b,c,d,x[i+9],4,-640364487),d=hh(d,a,b,c,x[i+12],11,-421815835),c=hh(c,d,a,b,x[i+15],16,530742520),b=hh(b,c,d,a,x[i+2],23,-995338651),a=ii(a,b,c,d,x[i+0],6,-198630844),d=ii(d,a,b,c,x[i+7],10,1126891415),c=ii(c,d,a,b,x[i+14],15,-1416354905),b=ii(b,c,d,a,x[i+5],21,-57434055),a=ii(a,b,c,d,x[i+12],6,1700485571),d=ii(d,a,b,c,x[i+3],10,
-1894986606),c=ii(c,d,a,b,x[i+10],15,-1051523),b=ii(b,c,d,a,x[i+1],21,-2054922799),a=ii(a,b,c,d,x[i+8],6,1873313359),d=ii(d,a,b,c,x[i+15],10,-30611744),c=ii(c,d,a,b,x[i+6],15,-1560198380),b=ii(b,c,d,a,x[i+13],21,1309151649),a=ii(a,b,c,d,x[i+4],6,-145523070),d=ii(d,a,b,c,x[i+11],10,-1120210379),c=ii(c,d,a,b,x[i+2],15,718787259),b=ii(b,c,d,a,x[i+9],21,-343485551),a=add(a,olda),b=add(b,oldb),c=add(c,oldc),d=add(d,oldd);return rhex(a)+rhex(b)+rhex(c)+rhex(d)};
