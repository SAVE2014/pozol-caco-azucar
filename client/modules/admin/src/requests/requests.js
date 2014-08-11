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

    .factory('EditRequestSvc', function(growl, RequestsSvc){
        var service = {};

        service.request = {};

        service.setRequest = function(request){
            service.request = request;
        };

        service.updateRequest = function(){
            service.request.put().then(function() {
                    growl.addSuccessMessage("Solucitud editada exitosamente");
                }, function() {
                    growl.addErrorMessage("Error al editar solicitud");
            });
        };

        service.deleteRequest = function(){
            service.request.remove().then(function() {
                    growl.addSuccessMessage("Solicitud borrada exitosamente");
                    RequestsSvc.splice(RequestsSvc.indexOf(service.request), 1);
                    service.request = {};
                }, function() {
                    growl.addErrorMessage("Error al borrar solicitud");
            });
        };

        return service;
    })


    .controller('RequestsController', function ($scope, RequestsSvc, EditRequestSvc) {
        $scope.requests = RequestsSvc;

        $scope.editRequest = EditRequestSvc;

        $scope.editView = false;

        $scope.disableInputs = true;


        $scope.hideDetails = function(){
            $scope.editView = false;
            $scope.disableInputs = true;
        };

        $scope.setEditRequest = function(request){
            $scope.editView = true;
            $scope.disableInputs = true;
            EditRequestSvc.setRequest(request);
        };

        $scope.saveRequest = function(){
            EditRequestSvc.updateRequest();
            $scope.disableInputs = true;
        };

        $scope.deleteRequest = function(){
            EditRequestSvc.deleteRequest();
            $scope.disableInputs = true;
        };

    })
;
