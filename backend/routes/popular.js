'use strict';

module.exports = function(imports) {
    return {
        get: require('../lib/get_data')({api: imports.api}).bind(null, 'popular')
    };
};
