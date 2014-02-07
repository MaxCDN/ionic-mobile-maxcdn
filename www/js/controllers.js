'use strict';

angular.module('monitor.controllers', [])
.controller('DashboardCtrl', function($scope, StatisticsService) {
    $scope.statistics = StatisticsService.get();
}).controller('PopularCtrl', function($scope) {
    // TODO
});
