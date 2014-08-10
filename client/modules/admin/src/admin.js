angular.module('admin', [
    'ngRoute',
    'ngResource',
    'ngAnimate',
    'ui.router',
    'restangular',
    'angular-growl',
    'ng-file-upload',
    'admin.front',
    'admin.add',
    'admin.cars',
    'admin.requests',
    'templates-app'])


    .config(function ($stateProvider, $urlRouterProvider, RestangularProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        RestangularProvider.setBaseUrl('/api/v1');
        $locationProvider.html5Mode(true);

    })

    .controller('AdminController', function($scope, Restangular) {


    })
;
