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
        $scope.search = {};
        $scope.type = 'Tipo de Carro';
        $scope.engine = 'Motor';
        $scope.price = 'Precio';
        $scope.minPrice = 50000;
        $scope.maxPrice = 400000;

        $scope.setType = function(type){
            $scope.search.type = type;
            $scope.type = type;
        };

        $scope.setEngine = function(engine){
            $scope.search.engine = engine;
            $scope.engine = engine + ' Cilindros';
        };

        $scope.setPrice = function(price){
            $scope.search.price = price;
        };
        
        $scope.search = function () {
            $scope.searchMode = false;
        };

        $scope.items = ItemsSvc;
    })
;
