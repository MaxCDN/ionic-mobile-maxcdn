'use strict';

angular.module('monitor.controllers', [])
.controller('DashboardCtrl', function($scope, dataService) {
    dataService.getStatistics().then(function(statistics) {
        $scope.statistics = statistics;
    });
}).controller('PopularCtrl', function($scope, dataService) {
    dataService.getPopular().then(function(popular) {
        $scope.popular = popular;
    });
});
