angular.module('app.search', ['ngRoute'])

    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('results', {
                url: '/results/:type/:cylinders/:minPrice/:maxPrice',
                templateUrl: 'results/results.tpl.html',
                controller: 'ResultsController'
            });
    })

    .factory('ResultsSvc', function(Restangular, $stateParams){
        var type = $stateParams.type;
        var cylinders = $stateParams.cylinders;
        var minPrice = $stateParams.minPrice;
        var maxPrice = $stateParams.maxPrice;
        return Restangular.all('items').getList().$object;
    })

    .controller('ResultsController', function($scope, $routeParams, ItemsSvc) {



        $scope.items = ItemsSvc;
    })
;
