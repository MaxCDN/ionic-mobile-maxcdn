'use strict';

module.exports = require('annoinject')(['api'], function(imports) {
    return function(type, req, res) {
        var user = req.session && req.session.user;

        if(user) {
            imports.api[type]({
                alias: user.alias,
                token: user.token,
                'token_secret': user['token_secret']
            }, function(err, popular) {
                if(err) {
                    console.warn(err);

                    return res.send(500);
                }

                res.json(popular);
            });
        }
        else {
            res.send(401);
        }
    };
});
