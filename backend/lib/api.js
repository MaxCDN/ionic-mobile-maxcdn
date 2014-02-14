'use strict';

var extend = require('util')._extend;


module.exports = function(baseConfig) {
    var request = require('request');

    return {
        companyAlias: function(config, cb) {
            get('account.json', config, function(err, d) {
                if(err) {
                    return cb(err);
                }

                if(!d || !d.account) {
                    return cb(new Error('No account was found!'));
                }

                cb(null, d.account.alias);
            });
        },
        stats: function(config, cb) {
            var alias = config.companyAlias;

            delete config.companyAlias;

            get(alias + '/reports/stats.json', config, function(err, d) {
                if(err) {
                    return cb(err);
                }

                cb(null, d.stats);
            });
        }
    };

    function get(url, config, cb) {
        request.get({
            url: 'https://rws.netdna.com/' + url,
            oauth: extend(extend({}, baseConfig), config),
            json: true
        }, function(err, res, body) {
            if(err) {
                return cb(err);
            }

            if(body.code !== 200) {
                return cb(new Error(body.error.message));
            }

            cb(null, body.data);
        });
    }
};
