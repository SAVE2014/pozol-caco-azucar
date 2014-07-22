angular.module('app.search', ['ngRoute'])

    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('search', {
                url: '/search',
                templateUrl: 'search/search.tpl.html',
                controller: 'SearchController'
            });
    })

    .controller('SearchController', function($scope, $routeParams) {

        $scope.type = '';
        $scope.engine = '';
        $scope.price = 200000;
        $scope.minPrice = 0;






        $scope.setType = function(type){
            $scope.type = type;
        };

        $scope.setEngine = function(engine){
            $scope.engine = engine;
        };

        $scope.setPrice = function(price){
            $scope.price = price;
        };
    })
;
