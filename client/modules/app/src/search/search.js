angular.module('app.search', ['ngRoute'])

    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('search', {
                url: '/search',
                'views':{
                    'main':{
                        templateUrl: 'search/search.tpl.html',
                        controller: 'SearchController'
                    }
                }
            });
    })

    .controller('SearchController', function($scope ) {

        $scope.type = 'Tipo de Carro';
        $scope.cylinders = '';
        $scope.minPrice = 50000;
        $scope.maxPrice = 2900000;

        $scope.setType = function(type){
            $scope.type = type;
        };

        $scope.setCylinders = function(engine){
            $scope.cylinders = engine;
        };

    })
;
