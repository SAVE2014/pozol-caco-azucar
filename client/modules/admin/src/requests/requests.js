angular.module('admin.requests', [])

    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('admin.requests', {
                url: 'requests',
                views: {
                    'main@admin': {
                        templateUrl: 'requests/requests.tpl.html',
                        controller: 'RequestsController'
                    }
                }
            });
    })

    .factory('RequestsSvc', function(Restangular){
        return Restangular.all('requests').getList().$object;
    })

    .factory('EditRequestSvc', function(){
        var service = {};

        service.request = {};

        service.setRequest = function(request){
            service.request = request;
        };

        service.updateRequest = function(){
            service.request.put();
        };

        return service;
    })


    .controller('RequestsController', function ($scope, RequestsSvc, EditRequestSvc) {
        $scope.requests = RequestsSvc;

        //$scope.requestService = EditWordSvc;

        $scope.disableEdit = true;


        $scope.hideDetails = function(){
            $scope.showdetails = false;
            $scope.disableEdit = true;
        };

        $scope.setEditWord = function(word){
            $scope.showdetails = true;
            $scope.disableEdit = true;
//            EditWordSvc.setWord(word);
        };

        $scope.enableEdit = function(){
            $scope.disableEdit = false;
        };

        $scope.saveWord = function(){
//            EditWordSvc.updateWord();
        };

    })
;




