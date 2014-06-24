/**
 * Created by aleksej on 24.06.14.
 */


var fs = require('fs');
var config = require('./../config.json');
var moment = require('moment');

console.logf = function(message){

    var msg = moment().format('MMMM Do YYYY, h:mm:ss') + ': ' + message + "\r\n";

    if (config.logEnabled) {
        fs.appendFile(global.appPath + config.logFile, msg);
    }

    console.log(msg);
}