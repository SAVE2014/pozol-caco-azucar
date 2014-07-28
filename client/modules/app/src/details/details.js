angular.module('app.details', [])

    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('details', {
                url: '/details/:itemId',
                templateUrl: 'details/details.tpl.html',
                controller: 'DetailsController'
            });
    })

    .controller('DetailsController', function ($scope, $stateParams, ItemsSvc) {
        $scope.itemId = $stateParams.itemId;

        $scope.item = ItemsSvc.get([ $scope.itemId]);

    })
;