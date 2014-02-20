'use strict';

module.exports = require('annoinject')(['api'], function(imports) {
    return function(type, req, res) {
        var user = req.session && req.session.user;

        if(user) {
            if(user.alias) {
                getData(type, user, res);
            }
            else {
                injectAlias(user, function(err) {
                    if(err) {
                        return res.send(401);
                    }

                    getData(type, user, res);
                });
            }
        }
        else {
            // regular browser
            var token = req.headers.token;
            var secret = req.headers.secret;

            if(!token || !secret) {
                return res.send(401);
            }

            // TODO: push alias to API level
            imports.api.companyAlias({
                token: token,
                'token_secret': secret
            }, function(err, alias) {
                if(err) {
                    return res.send(401);
                }

                getData(type, {
                    alias: alias,
                    token: token,
                    secret: secret
                }, res);
            });
        }
    };

    // TODO: move elsewhere
    function injectAlias(user, cb) {
        imports.api.companyAlias({
            token: user.token,
            'token_secret': user.secret
        }, function(err, alias) {
            if(err) {
                return cb(err);
            }

            user.alias = alias;

            cb();
        });
    }

    // TODO: move elsewhere
    function getData(type, user, res) {
        imports.api[type]({
            alias: user.alias,
            token: user.token,
            'token_secret': user.secret
        }, function(err, popular) {
            if(err) {
                console.warn(err);

                return res.send(500);
            }

            res.json(popular);
        });
    }
});
