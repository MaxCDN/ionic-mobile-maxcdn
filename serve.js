#!/usr/bin/env node
'use strict';

var http = require('http');
var express = require('express');
var authom = require('authom');

var MaxAuth = require('./lib/maxauth');

var config = require('./config');


main();

function main() {
    authom.registerService('maxcdn', MaxAuth);

    serve();
}

function serve() {
    var app = express();

    app.configure(function() {
        app.set('port', config.port);
        app.set('views', __dirname + '/views');
        app.set('view engine', 'ejs');
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.cookieParser(config.cookieSecret));
        app.use(express.session());
        app.use(app.router);
    });

    authom.createServer({
        service: 'maxcdn',
        key: config.key,
        secret: config.secret
    });

    authom.on('auth', function(req, res, data){
        if(!req.session ){
            return res.send(500);
        }

        req.session.user = data;
        res.redirect('/');
    });

    authom.on('error', function(req, res, data){
        res.json(data);
    });

    app.get('/auth/:service', authom.app);

    app.get('/', function(req, res){
        var user = (req.session && req.session.user) ? req.session.user : false;

        if(user) {
            // TODO: fetch company alias and attach it to user data
        }

        res.render('index', {
            user: user
        });
    });

    http.createServer(app).listen(app.get('port'), function() {
        console.log('Express server listening on '+ app.get('port'));
    });
}
