angular.module('admin.items', [])

    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('admin.items', {
                url: 'items',
                views: {
                    'main@admin': {
                        templateUrl: 'items/items.tpl.html',
                        controller: 'ItemsController'
                    }
                }
            });
    })

    .factory('ItemsSvc', function(Restangular){
        return Restangular.all('items').getList().$object;
    })

    .factory('EditItemSvc', function(growl){
        var service = {};

        service.item = {};

        service.setItem = function(item){
            service.item = item;
        };

        service.updateItem = function(){
            service.item.put().then(function(addedBuilding) {
                    growl.addSuccessMessage("Articulo editado exitosamente");
                }, function() {
                    growl.addErrorMessage("Error al editado articulo");
            });
        };

        return service;
    })


    .controller('ItemsController', function ($scope, ItemsSvc, EditItemSvc) {
        $scope.items = ItemsSvc;

        $scope.editItem = EditItemSvc;

        $scope.editView = false;

        $scope.disableInputs = true;


        $scope.hideDetails = function(){
            $scope.editView = false;
            $scope.disableInputs = true;
        };

        $scope.setEditItem = function(item){
            $scope.editView = true;
            $scope.disableInputs = true;
            EditItemSvc.setItem(item);
        };

        $scope.saveItem = function(){
            EditItemSvc.updateItem();
        };

    })
;




