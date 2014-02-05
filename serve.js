#!/usr/bin/env node
'use strict';

var http = require('http');
var express = require('express');
var authom = require('authom');

var MaxAuth = require('./lib/maxauth');

var config = require('./config');
var api = require('./lib/api')(config.maxcdn);


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
        key: config.maxcdn['consumer_key'],
        secret: config.maxcdn['consumer_secret']
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

    app.get('/', function(req, res) {
        var user = (req.session && req.session.user)? req.session.user: null;

        if(user) {
            user['token_secret'] = user.secret;

            api.companyAlias({
                token: user.token,
                'token_secret': user['token_secret']
            }, function(err, companyAlias) {
                if(err) {
                    console.warn(err);

                    // XXX: maybe give warning instead?
                    return res.render('index', {
                        user: user
                    });
                }

                user.companyAlias = companyAlias;

                // TODO: attach stats (or implement api)

                res.render('index', {
                    user: user
                });
            });
        }
        else {
            res.render('index', {
                user: user
            });
        }
    });

    http.createServer(app).listen(app.get('port'), function() {
        console.log('Express server listening on '+ app.get('port'));
    });
}
