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
                if(data) {
                    resources[resource] = data;

                    deferred.resolve(data);
                }
                else {
                    loginService(function() {
                        getOrLoginAndGet(resource, deferred);
                    });
                }
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
});
