angular.module('admin', [
    'ngRoute',
    'ngResource',
    'ngAnimate',
    'ui.router',
    'restangular',
    'admin.front',
    'admin.add',
    'admin.edit',
    'admin.requests',
    'templates-app'])


    .config(function ($stateProvider, $urlRouterProvider, RestangularProvider) {
        $urlRouterProvider.otherwise('/');
        RestangularProvider.setBaseUrl('/api/v1');

    })

    .controller('AdminController', function($scope, Restangular, EditWordSvc) {


    })
;
