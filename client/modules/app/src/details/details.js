angular.module('app.details', [])

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('details', {
                url: '/details/:itemId',
                templateUrl: 'details/details.tpl.html',
                controller: 'DetailsController'
            });
    })

    .factory('ItemDetailsSvc', function( Restangular , $stateParams){
        var itemId = $stateParams.itemId;
        return Restangular.one('items', itemId).get();
    })

    .controller('DetailsController', function ($scope, $stateParams, ItemDetailsSvc) {

        $scope.item = ItemDetailsSvc;
        console.log($scope.item);
    })
;