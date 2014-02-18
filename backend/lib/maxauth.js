'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');
var url = require('url');
var OAuth;
var secrets = {};


try {
    OAuth = require('oauth').OAuth;
}
catch (e) {
    throw new Error('oauth library could not be loaded.');
}

function Max(options) {
    this.key = options.key;
    this.secret = options.secret;

    this.on('request', this.onRequest.bind(this));

    EventEmitter.call(this);
}

util.inherits(Max, EventEmitter);

Max.prototype.parseURI = function(request) {
    var protocol = request.socket.encrypted? 'https': 'http';
    var host = request.headers.host || request.connection.remoteAddress;

    return url.parse(protocol + '://' + host + request.url, true);
};

Max.prototype.getReturnCall = function(request) {
    var protocol = request.socket.encrypted? 'https': 'http';
    var host = request.headers.host || request.connection.remoteAddress;

    return protocol + '://' + host + request.url;
};

Max.prototype.onRequest = function(req, res) {
    var self = this;
    var uri = this.parseURI(req);
    var verifier = uri.query.oauth_verifier;
    var token = uri.query.oauth_token;
    var returnPath = this.getReturnCall(req);
    var oa = new OAuth(
        'https://rws.netdna.com/oauth/request_token',
        'https://rws.netdna.com/oauth/access_token',
        this.key,
        this.secret,
        '1.0',
        null,
        'HMAC-SHA1'
    );

    if(verifier && token) {
        oa.getOAuthAccessToken(token, secrets[token], verifier, onToken);
    }
    else {
        oa.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret) {
            if(error) {
                return self.emit('error', req, res, uri.query, error);
            }

            secrets[oauthToken] = oauthTokenSecret;
            setTimeout(function() {
                delete secrets[oauthToken];
            }, 60000);

            res.writeHead(302, {
                Location: 'https://rws.netdna.com/oauth/authorize?oauth_token=' +
                    oauthToken + '&oauth_callback=' + returnPath
            });

            res.end();
        });
    }

    function onToken(error, oauthAccessToken, oauthAccessTokenSecret, results){
        if(error) {
            return self.emit('error', req, res, uri.query, error);
        }

        self.emit('auth', req, res, {
            token: oauthAccessToken,
            secret: oauthAccessTokenSecret,
            id: results.uid,
            data: results
        });
    }
};

module.exports = Max;
