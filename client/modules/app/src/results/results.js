angular.module('app.results', ['ngRoute'])

    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('search.results', {
                url: '/:type/:cylinders/:minPrice/:maxPrice',
                'views': {
                    'main@':{
                        templateUrl: 'results/results.tpl.html',
                        controller: 'ResultsController'
                    }
                }
            });
    })

    .factory('ResultsSvc', function(Restangular, $stateParams){
        var type = $stateParams.type;
        var cylinders = $stateParams.cylinders;
        var minPrice = $stateParams.minPrice;
        var maxPrice = $stateParams.maxPrice;
        //TODO: return items based on parameters...
        return Restangular.all('items').getList().$object;
    })

    .controller('ResultsController', function($scope, $routeParams, ItemsSvc) {


        $scope.items = ItemsSvc;
    })
;