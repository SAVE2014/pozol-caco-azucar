angular.module('admin.edit', [])

    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('admin.edit', {
                url: 'edit',
                views: {
                    'main@admin': {
                        templateUrl: 'words_edit/words_edit.tpl.html',
                        controller: 'WordEditController'
                    },
                    'details@admin.edit': {
                        templateUrl: 'words_add/words_add.tpl.html'

                    }
                }

            });
    })

    .factory('WordsSvc', function(Restangular){
        return Restangular.all('words').getList().$object;
    })


    .factory('EditWordSvc', function(){
        var service = {};

        service.word = {};


        service.setWord = function(word){
            service.word = word;
        };

        service.addExample = function(){
            service.word.examples.push({content:'', meaning:''});
        };

        service.removeExample = function(index){
            if(service.word.examples.length > 1){
                service.word.examples.splice(index, 1);
            }
        };

        service.addCountry = function(){
            service.word.countries.push('');
        };

        service.removeCountry = function(index){
            if(service.word.countries.length > 1){
                service.word.countries.splice(index, 1);
            }
        };

        service.addTag = function(){
            service.word.tags.push('');
        };

        service.removeTag = function(index){
            if(service.word.tags.length > 1){
                service.word.tags.splice(index, 1);
            }
        };

        service.updateWord = function(){
            service.word.put();
        };

        return service;
    })

    .controller('WordEditController', function ($scope, WordsSvc, EditWordSvc) {

        $scope.words = WordsSvc;

        $scope.wordService = EditWordSvc;

        $scope.disableEdit = true;

        $scope.addExample = function(){
            EditWordSvc.addExample();
        };

        $scope.removeExample = function(index){
            EditWordSvc.removeExample(index);
        };

        $scope.addCountry = function(){
            EditWordSvc.addCountry();
        };

        $scope.removeCountry = function(index){
            EditWordSvc.removeCountry(index);
        };

        $scope.addTag = function(){
            EditWordSvc.addTag();
        };

        $scope.removeTag = function(index){
            EditWordSvc.removeTag(index);
        };

        $scope.hideDetails = function(){
            $scope.showdetails = false;
            $scope.disableEdit = true;
        };

        $scope.setEditWord = function(word){
            $scope.showdetails = true;
            $scope.disableEdit = true;
            EditWordSvc.setWord(word);
        };

        $scope.enableEdit = function(){
            $scope.disableEdit = false;
        };

        $scope.saveWord = function(){
            EditWordSvc.updateWord();
        };

    })
;