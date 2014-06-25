/*
    Datamodel.js - схемы БД и дополнительные подезные методы

    Date: 24.06.2014
    Author: Tayanchin Alexey
    Website: http://redspirit.ru/
 */

var crypto = require('crypto');
var mongoose = require('mongoose');
var config = require('./../config.json');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://' + config.mongo.server + ':' + config.mongo.port + '/' + config.mongo.base + '?auto_reconnect');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log('Database is ready:', config.mongo.base);
});

// global function
global.def = function (val, d){
    d = typeof d == 'undefined' ? '' : d;
    return typeof val == 'undefined' ? d : val;
}


function nowTimestamp() {
    var d = new Date();
    return Math.round(d.valueOf() / 1000);
}
function md5(s) {
    return crypto.createHash('md5').update(s).digest('hex');
}
function sha1(s) {
    return crypto.createHash('sha1').update(s).digest('hex');
}
function to_base64(data) {
    return new Buffer(data, 'binary').toString('base64');
}
function from_base64(str) {
    return new Buffer(str, 'base64').toString('binary');
}
function randomHash(c) {
    for (var a = "", b = 0; b < c; b++)a += "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890"[Math.floor(62 * Math.random())];
    return a
};


// SCHEMES

var RoomSchema = new Schema({
    name: { type: String, required: true },
    caption: {type: String, default: ''},
    topic: {type: String, default: 'Еще одна комната в этом чате'},
    banned: {type: Schema.Types.Mixed},
    moderators: {type: Schema.Types.Mixed},
    users: {type: Schema.Types.Mixed},
    silent: {type: Schema.Types.Mixed},
    created: {type: Number,default: nowTimestamp()},
    hidden: {type: Number, default: 0},
    owner: {type: String},
    totalmessages: {type: Number, default: 0 }
});

var UserSchema = new Schema({
    login: {type: String,required: true},
    nick: {type: String },
    nick_date: {type: Number,default: 0},
    pass: { type: String },
    ip: { type: String },
    last_login: {type: Number,default: 0},
    mess_count: {type: Number, default: 0 },
    privilege: { type: Number},
    state: {type: Number,default: 0},
    statustext: { type: Number, default: '' },
    textcolor: { type: String,default: config.defaultColor},
    reg_date: {type: Number,default: nowTimestamp() },
    client: {type: String,default: ''},
    block: { type: Number,default: 0 },
    block_reason: { type: String, default: '' },
    ava_index: {type: String, default: 0},
    profile_visible: { type: Number,default: 1 },
    vk_id: {type: Number, default: 0},
    profile: {type: Schema.Types.Mixed}
});


exports.ObjectId = mongoose.Types.ObjectId;
exports.timestamp = nowTimestamp;
exports.md5 = md5;
exports.sha1 = sha1;
exports.to_base64 = to_base64;
exports.from_base64 = from_base64;
exports.randomHash = randomHash;


exports.Room = mongoose.model('Room', RoomSchema);
exports.User = mongoose.model('User', UserSchema);

/*
 exports.obLen = function(ob){var cc=0; for(var i in ob) cc++; return cc};
 exports.obj2arr = function(ob){var ar=[]; for(var i in ob) ar.push(i); return ar};
 */
