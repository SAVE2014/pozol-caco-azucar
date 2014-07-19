angular.module('app.search', ['ngRoute'])

    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('search', {
                url: '/search',
                templateUrl: 'search/search.tpl.html',
                controller: 'SearchController'
            });
    })

    .controller('SearchController', function($scope, $routeParams) {

        $scope.searchText  =  $routeParams.wordName || '';

    })
;