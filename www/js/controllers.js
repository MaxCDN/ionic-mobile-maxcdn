'use strict';

angular.module('monitor.controllers', [])
.controller('DashboardCtrl', function($scope, dataService, bytesToSizeService, numberWithCommasService) {
    dataService.getStatistics().then(function(statistics) {
        $scope.statistics = statistics;
    });

    $scope.bytesToSize = bytesToSizeService;
    $scope.numberWithCommas = numberWithCommasService;
}).controller('PopularCtrl', function($scope, dataService, bytesToSizeService, numberWithCommasService) {
    dataService.getPopular().then(function(popular) {
        $scope.popular = popular;
    });

    $scope.bytesToSize = bytesToSizeService;
    $scope.numberWithCommas = numberWithCommasService;
});
