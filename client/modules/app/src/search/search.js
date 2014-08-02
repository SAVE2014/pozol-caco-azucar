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

    .factory('ItemsSvc', function(Restangular){
        return Restangular.all('items').getList().$object;
    })

    .controller('SearchController', function($scope ) {

        $scope.searchMode = true;
        $scope.search = {};
        $scope.type = 'Tipo de Carro';
        $scope.cylinders = '';
        $scope.price = 'Precio';
        $scope.minPrice = 50000;
        $scope.maxPrice = 1900000;

        $scope.setType = function(type){
            $scope.type = type;
        };

        $scope.setCylinders = function(engine){
            $scope.cylinders = engine;
        };

        $scope.setPrice = function(price){
            $scope.search.price = price;
        };
        
        $scope.search = function () {
            $scope.searchMode = false;
        };

    })
;
