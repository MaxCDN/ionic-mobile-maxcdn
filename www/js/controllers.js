'use strict';

angular.module('monitor.controllers', [])
.controller('DashboardCtrl', function($scope, StatisticsService, LoginService, $http) {
    $scope.login = LoginService;

    $scope.statistics = StatisticsService.get();
}).controller('PopularCtrl', function($scope, LoginService) {
    $scope.login = LoginService;

    // TODO: fetch data
});
