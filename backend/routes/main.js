'use strict';

module.exports = function(imports) {
    return {
        get: function(req, res) {
            var user = req.session && req.session.user;

            if(user) {
                user['token_secret'] = user.secret;

                imports.api.companyAlias({
                    token: user.token,
                    'token_secret': user['token_secret']
                }, function(err, alias) {
                    if(err) {
                        console.warn(err);

                        // XXX: maybe give warning instead?
                        return res.render('index', {
                            user: user
                        });
                    }

                    user.alias = alias;

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
        }
    };
};
