angular.module('app.details', [])

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('search.results.details', {
                url: '/details/:itemId',
                'views':{
                    'main@': {
                        templateUrl: 'details/details.tpl.html',
                        controller: 'DetailsController'
                    }
                }
            });
    })

    .factory('ItemDetailsSvc', function( Restangular , $stateParams){
        var itemId = $stateParams.itemId;
        return Restangular.one('items', itemId).get().$object;
    })

    .controller('DetailsController', function ($scope, $route, ItemDetailsSvc, $stateParams) {
        var type = $stateParams.type;
        var cylinders = $stateParams.cylinders;
        var minPrice = $stateParams.minPrice;
        var maxPrice = $stateParams.maxPrice;

        $scope.item = ItemDetailsSvc;
        console.log($scope.item);
    })
;