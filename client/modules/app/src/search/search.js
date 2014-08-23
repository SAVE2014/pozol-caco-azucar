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

        $scope.type = 'Type of Car';
        $scope.cylinders = '';
        $scope.minPrice = 5000;
        $scope.maxPrice = 190000;

        $scope.setType = function(type){
            $scope.type = type;
        };

        $scope.setCylinders = function(engine){
            $scope.cylinders = engine;
        };

    })
;
