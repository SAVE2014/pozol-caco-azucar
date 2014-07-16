angular.module('admin.front', [])

    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('admin', {
                url: '/',
                views: {
                    '': {
                        abstract: true,
                        templateUrl: 'front/front.tpl.html'
                    },
                    'main@admin': {
                        template: 'Hello!'
                    }
                }
            });
    })

    .controller('FrontController', function ($scope) {


    })
;