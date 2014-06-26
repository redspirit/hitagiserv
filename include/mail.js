/**
    Mail.js - отправка писем

    Date: 26.06.2014
    Author: Tayanchin Alexey
    Website: http://redspirit.ru/
*/

var config = require('./../config.json');
var nodemailer = require("nodemailer");


var smtpTransport = nodemailer.createTransport("SMTP", {
    service: config.mail.service,
    auth: {
        user: config.mail.user,
        pass: config.mail.pass
    }
});


exports.send = function(to, subj, text){

    var mailOptions = {
        from: config.mail.from,
        to: to,
        subject: subj,
        html: text
    }

    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error) {
            console.logf('Ошибка отправки емейла - ' + to);
        }
    });


}