'use strict';

module.exports = function() {
    return {
        get: function(req, res) {
            res.render('index', {
                user: req.session && req.session.user
            });
        }
    };
};
