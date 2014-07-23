angular.module('app.search', ['ngRoute'])

    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('search', {
                url: '/search',
                templateUrl: 'search/search.tpl.html',
                controller: 'SearchController'
            });
    })

    .factory('ItemsSvc', function(Restangular){
        return Restangular.all('items').getList().$object;
    })

    .controller('SearchController', function($scope, $routeParams, ItemsSvc) {

        $scope.searchMode = true;
        $scope.type = '';
        $scope.engine = '';
        $scope.price = 200000;

        $scope.setType = function(type){
            $scope.type = type;
        };

        $scope.setEngine = function(engine){
            $scope.engine = engine;
        };

        $scope.setPrice = function(price){
            $scope.price = price;
        };
        
        $scope.search = function () {
            $scope.searchMode = false;
        };

        $scope.items = ItemsSvc;
    })
;
