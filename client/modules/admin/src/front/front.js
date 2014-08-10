angular.module('admin.front', [])

    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('admin', {
                url: '/admin/',
                controller:'FrontController',
                templateUrl: 'front/front.tpl.html'
            });
    })

    .controller('FrontController', function ($scope, RequestsSvc) {


    })
;