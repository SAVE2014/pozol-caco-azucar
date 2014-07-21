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

    .factory('AddItemSvc', function(ItemsSvc){

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
            ItemsSvc.post(service);
            service.model = '';
            service.type = '';
            service.price = '';
            service.brand = '';
            service.description = '';
            service.images = [];
        };

        return service;
    })

    .controller('ItemsAddController', function ($scope, $upload, AddItemSvc, growl) {

        $scope.addItem = AddItemSvc;


        $scope.saveItem = function(){
            AddItemSvc.saveItem();
            growl.addSuccessMessage("Articulo agregado exitosamente");
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