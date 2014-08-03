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

    .controller('DetailsController', function ($scope, ItemDetailsSvc) {

        $scope.item = ItemDetailsSvc;
        console.log($scope.item);
    })
;