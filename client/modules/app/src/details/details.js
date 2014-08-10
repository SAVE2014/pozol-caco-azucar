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

    .controller('DetailsController', function ($scope, $stateParams, ResultsSvc) {
        var id = $stateParams.itemId;

        $scope.item = ResultsSvc.getone(id);
    })
;