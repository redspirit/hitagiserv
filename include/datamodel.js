/**
 * Created by Red Spirit on 24.06.14.
 */

var mongoose = require('mongoose');
var config = require('./../config.json');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://' + config.mongo.server + ':' + config.mongo.port + '/' + config.mongo.base + '?auto_reconnect');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('Database is ready:', config.mongo.base);
});

function nowTimestamp() {
    var d = new Date();
    return Math.round(d.valueOf() / 1000);
}

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

var RoomSchema = new Schema({
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
        default:0
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

exports.Room = mongoose.model('Room', RoomSchema);
