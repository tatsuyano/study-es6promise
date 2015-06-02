/*
'use strict'

var Promise = require('es6-promise').Promise;
var https = require('https');

var pref = function(code) {
    return new Promise(function (resolve,reject) {
        var url = 'https://gist.githubusercontent.com/tatsuyano/82f6b59b050e500d8947/raw/e2ba56c185ff7dd9ef7919412f96aba85d4a57c4/pref';
        var response = https.get(url, function (res) {
            var body = '';
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function (res) {
                var json = JSON.parse(body);
                var pref = json[code];
                if(pref !== undefined) {
                    resolve(pref);
                } else {
                    reject(new Error("The key is not match."));
                }
            });
        }).on('error',function (e) {
            reject(new Error(e.message));
        });
    });
}

var city = function(code) {
    return new Promise(function (resolve,reject) {
        var url = 'https://gist.githubusercontent.com/tatsuyano/2a6b9e8170417025d74e/raw/489c42c171ed1127d6ef368b2d066647b8649d89/city';
        var response = https.get(url, function (res) {
            var body = '';
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function (res) {
                var json = JSON.parse(body);
                resolve(json[code]);
            });
        }).on('error',function (e) {
            reject(new Error(e.message));
        });
    });
}

pref(process.argv[2])
    .then(city)
    .then(function (result) {
        console.log(result);
    })
    .catch(function (err) {
        console.log(err);
    });
