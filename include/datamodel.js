/**
 * Created by Red Spirit on 24.06.14.
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
    name: {
        type: String,
        required: true
    },
    caption: {
        type: String
    },
    topic: {
        type: String
    },
    banned: {
        type: Schema.Types.Mixed
    },
    moderators: {
        type: Schema.Types.Mixed
    },
    users: {
        type: Schema.Types.Mixed
    },
    silent: {
        type: Schema.Types.Mixed
    },
    created: {
        type: Number,
        default: nowTimestamp()
    },
    hidden: {
        type: Number,
        default: 0
    },
    owner: {
        type: String
    },
    totalmessages: {
        type: Number
    }
});


/*
 "birthday": NumberInt(557863200),
 "country": "Russia",
 "email": "redspirit@live.ru",
 "facebook": "",
 "gender": "1",
 "homepage": "http:\/\/redspirit.ru",
 "icq": "434017172",
 "phone": "",
 "realname": "Алексей",
 "skype": "",
 "twitter": "",
 "vk": "http:\/\/vk.com\/aniwatch"
 */

var UserSchema = new Schema({
    login: {
        type: String,
        required: true
    },
    nick: {
        type: String
    },
    nick_date: {
        type: Number
    },
    pass: {
        type: String
    },
    ip: {
        type: String
    },
    last_login: {
        type: Number
    },
    mess_count: {
        type: Number
    },
    privilege: {
        type: Number
    },
    state: {
        type: Number
    },
    statustext: {
        type: Number
    },
    textcolor: {
        type: String,
        default: config.defaultColor
    },
    reg_date: {
        type: Number,
        default: nowTimestamp()
    },
    client: {
        type: String
    },
    block: {
        type: Number,
        default: 0
    },
    block_reason: {
        type: String
    },
    ava_index: {
        type: String,
        default: 0
    },
    profile_visible: {
        type: Number,
        default: 1
    },
    profile: {
        type: Number
    }
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
