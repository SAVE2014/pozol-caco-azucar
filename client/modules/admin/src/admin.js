angular.module('admin', [
    'ngRoute',
    'ngResource',
    'ngAnimate',
    'ui.router',
    'restangular',
    'angular-growl',
    'admin.front',
    'admin.add',
    'admin.items',
    'templates-app'])


    .config(function ($stateProvider, $urlRouterProvider, RestangularProvider, growlProvider) {
        $urlRouterProvider.otherwise('/');
        RestangularProvider.setBaseUrl('/api/v1');
        //growlProvider.globalTimeToLive(5000);

    })

    .controller('AdminController', function($scope, Restangular) {


    })
;
