'use strict';

angular.module('monitor.services', [])
.factory('dataService', function($http, $q, loginService, constants) {
    var resources = {};

    return {
        getStatistics: getOrLoginAndGet.bind(null, 'statistics'),
        getPopular: getOrLoginAndGet.bind(null, 'popular')
    };

    function getOrLoginAndGet(resource, deferred) {
        deferred = deferred || $q.defer();

        if(resource in resources) {
            deferred.resolve(resources[resource]);
        }
        else {
            $http.get(constants.baseUrl + resource).success(function(data) {
                resources[resource] = data;

                deferred.resolve(data);
            }).error(function() {
                loginService(function() {
                    getOrLoginAndGet(resource, deferred);
                });
            });
        }

        return deferred.promise;
    }
}).factory('loginService', function(constants) {
    return function(cb) {
        var ref = window.open(constants.baseUrl + 'auth/maxcdn', '_blank', 'location=yes,transitionstyle=fliphorizontal');

        ref.addEventListener('loadstart', function(event) {
            if(event.url !== constants.baseUrl) {
                return;
            }

            ref.close();

            cb(null, event);
        });
    };
}).factory('bytesToSizeService', function() {
    // http://codeaid.net/javascript/convert-size-in-bytes-to-human-readable-format-(javascript)
    return function(bytes, precision) {
        var kilobyte = 1024;
        var megabyte = kilobyte * 1024;
        var gigabyte = megabyte * 1024;
        var terabyte = gigabyte * 1024;

        if ((bytes >= 0) && (bytes < kilobyte)) {
            return bytes + ' B';

        } else if ((bytes >= kilobyte) && (bytes < megabyte)) {
            return (bytes / kilobyte).toFixed(precision) + ' KB';

        } else if ((bytes >= megabyte) && (bytes < gigabyte)) {
            return (bytes / megabyte).toFixed(precision) + ' MB';

        } else if ((bytes >= gigabyte) && (bytes < terabyte)) {
            return (bytes / gigabyte).toFixed(precision) + ' GB';

        } else if (bytes >= terabyte) {
            return (bytes / terabyte).toFixed(precision) + ' TB';

        } else {
            return bytes + ' B';
        }
    };
});
