/**
 * Created by hector on 7/14/14.
 */

var app = angular.module('app', [
    'ngRoute',
    'ui.router',
    'restangular'])

    .config(function ($stateProvider, $urlRouterProvider, RestangularProvider) {
        $urlRouterProvider.otherwise('/');
        RestangularProvider.setBaseUrl('/api/v1');
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'client/modules/admin/partials/front.html',
                controller: 'FrontController'
            });
    })
;