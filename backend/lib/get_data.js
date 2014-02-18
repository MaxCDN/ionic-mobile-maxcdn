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
            res.send(401);
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
