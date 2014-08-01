angular.module('app', [
    'ngRoute',
    'ngResource',
    'ui.router',
    'restangular',
    'ui-rangeSlider',
    'ngSanitize',
    'app.front',
    'app.search',
    'app.results',
    'app.details',
    'templates-app'])

    .config(function ($stateProvider, $urlRouterProvider, RestangularProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        RestangularProvider.setBaseUrl('/api/v1');
        $locationProvider.html5Mode(true);
    })

    .run(function($rootScope, $state){
        $rootScope.$state = $state;
    })

    .controller('AppController', function($scope, $routeParams) {


    })
;