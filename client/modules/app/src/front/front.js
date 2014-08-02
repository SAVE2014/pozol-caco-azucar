angular.module('app.front', [])

    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('home', {
                url: '/',
                'views': {
                    'main': {
                        templateUrl: 'front/front.tpl.html',
                        controller: 'FrontController'
                    }
                }
            });
    })

    .controller('FrontController', function ($scope) {


    })
;