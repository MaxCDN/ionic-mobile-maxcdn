'use strict';



module.exports = function(baseConfig) {
    var extend = require('util')._extend;
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
        statistics: function(config, cb) {
            get(config.alias + '/reports/stats.json', config, function(err, d) {
                if(err) {
                    return cb(err);
                }

                cb(null, d.stats);
            });
        },
        popular: function(config, cb) {
            get(config.alias + '/reports/popularfiles.json', config, function(err, d) {
                if(err) {
                    return cb(err);
                }

                cb(null, d.popularfiles);
            });
        }
    };

    function get(url, config, cb) {
        delete config.alias;

        var oauth = extend(extend({}, baseConfig), config);

        request.get({
            url: 'https://rws.netdna.com/' + url,
            oauth: oauth,
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
