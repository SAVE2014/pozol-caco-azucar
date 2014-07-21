angular.module('admin.add', [])

    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('admin.add', {
                url: 'add',
                views: {
                    'main@admin': {
                        templateUrl: 'items_add/items_add.tpl.html',
                        controller: 'ItemsAddController'
                    }
                }
            });
    })

    .factory('AddItemSvc', function(ItemsSvc, growl){

        var service = {};
        service.model = '';
        service.type = '';
        service.price = '';
        service.brand = '';
        service.description = '';
        service.images = [];

        service.addImage = function(image){
            service.images.push(image);
        };

        service.saveItem = function() {
            console.log(JSON.stringify(service, null, '\t'));
            ItemsSvc.post(service).then(function(addedBuilding) {
                    service.model = '';
                    service.type = '';
                    service.price = '';
                    service.brand = '';
                    service.description = '';
                    service.images = [];
                    growl.addSuccessMessage("Articulo agregado exitosamente");
                }, function() {
                    growl.addErrorMessage("Error al agregar articulo");
            });
        };

        return service;
    })

    .controller('ItemsAddController', function ($scope, $upload, AddItemSvc) {

        $scope.addItem = AddItemSvc;

        $scope.saveItem = function(){
            AddItemSvc.saveItem();
        };

        $scope.imageJson = {};

        $scope.onSelectFile = function ($files, resp) {
            var file = $files[0];
            $scope.upload = $upload.upload({
                url: resp.url,
                file: file
            })
            .success(function (data, status, headers, config) {
                 console.log(data);
                 AddItemSvc.addImage(data);
            });
        };

    })
;