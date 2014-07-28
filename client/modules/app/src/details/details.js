angular.module('app.details', [])

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('details', {
                url: '/details/:itemId',
                templateUrl: 'details/details.tpl.html',
                controller: 'DetailsController'
            });
    })

    .controller('DetailsController', function ($scope, $stateParams, Restangular) {
        var itemId = $stateParams.itemId;
        console.log(itemId);

        $scope.item = Restangular.one('items', itemId);
        console.log($scope.item);

    })
;