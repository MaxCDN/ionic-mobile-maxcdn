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
}).factory('LoginService', function($q) {
    return function() {
        var baseUrl = 'http://162.243.135.75:3000/';

        var ref = window.open(baseUrl + 'auth/maxcdn', '_blank', 'location=yes,transitionstyle=fliphorizontal');

        ref.addEventListener('loadstart', function(event) {
            if(event.url !== baseUrl ) {
                return;
            }

            ref.close();

            // TODO: done now! trigger some handler (pass here)
        });
    };
});
