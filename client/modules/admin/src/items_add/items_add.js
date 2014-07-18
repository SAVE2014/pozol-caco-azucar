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

    .factory('AddItemSvc', function(){

        var service = {};
        service.model = '';
        service.type = '';
        service.price = '';
        service.brand = '';
        service.description = '';
//        service.images = [''];
//
        service.saveItem = function() {
            console.log(JSON.stringify(service, null, '\t'));
        };

        return service;
    })

    .controller('ItemsAddController', function ($scope, AddItemSvc) {

        $scope.addItem = AddItemSvc;


        $scope.saveItem = function(){
            AddItemSvc.saveItem();
        };

    })
;