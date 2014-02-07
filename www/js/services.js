'use strict';

angular.module('monitor.services', []).factory('StatisticsService', function() {
    // TODO: fetch via API
    return {
        get: function() {
            return {
                transferred: 72.95,
                cacheHits: 4599850952,
                nonCacheHits: 18315179
            };
        }
    };
});
