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
        service.vulgar = false;
        service.definition = '';
        service.origin = '';
        service.examples = [{content:'', meaning:''}];
        service.tags = [''];
        service.images = [''];



        service.saveWord = function(word){
                    console.log(JSON.stringify(word, null, '\t'));
                };

        return service;
    })

    .controller('ItemsAddController', function ($scope, AddItemSvc) {

        $scope.item = AddItemSvc;

//        $scope.addExample = function(){
//            AddWordSvc.addExample();
//        };
//
//        $scope.removeExample = function(index){
//            AddWordSvc.removeExample(index);
//        };
//
//        $scope.addCountry = function(){
//            AddWordSvc.addCountry();
//        };
//
//        $scope.removeCountry = function(index){
//            AddWordSvc.removeCountry(index);
//        };
//
//        $scope.addTag = function(){
//            AddWordSvc.addTag();
//        };
//
//        $scope.removeTag = function(index){
//            AddWordSvc.removeTag(index);
//        };
//
//        $scope.consoleword = function(word){
//            AddWordSvc.saveWord(word);
//        };

    })
;