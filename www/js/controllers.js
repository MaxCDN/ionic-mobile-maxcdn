'use strict';

angular.module('monitor.controllers', [])
.controller('DashboardCtrl', function($scope, dataService, bytesToSizeService) {
    dataService.getStatistics().then(function(statistics) {
        $scope.statistics = statistics;
    });

    $scope.bytesToSize = bytesToSizeService;
}).controller('PopularCtrl', function($scope, dataService, bytesToSizeService) {
    dataService.getPopular().then(function(popular) {
        $scope.popular = popular;
    });

    $scope.bytesToSize = bytesToSizeService;
});
