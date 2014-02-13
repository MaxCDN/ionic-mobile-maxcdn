'use strict';

angular.module('monitor', ['ionic', 'monitor.constants', 'monitor.services', 'monitor.controllers'])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl:  'templates/tabs.html'
    })
    .state('tab.dashboard', {
        url: '/dashboard',
        views: {
            'dashboard-tab': {
                templateUrl: 'templates/dashboard.html',
                controller: 'DashboardCtrl'
            }
        }
    })
    .state('tab.popular', {
        url: '/popular',
        views: {
            'popular-tab': {
                templateUrl: 'templates/popular.html',
                controller: 'PopularCtrl'
            }
        }
    })
    .state('tab.about', {
        url: '/about',
        views: {
            'about-tab': {
                templateUrl: 'templates/about.html'
            }
        }
    });

    $urlRouterProvider.otherwise('/tab/dashboard');
});

