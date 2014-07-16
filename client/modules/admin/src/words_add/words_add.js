angular.module('admin.add', [])

    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('admin.add', {
                url: 'add',
                views: {
                    'main@admin': {
                        templateUrl: 'words_add/words_add.tpl.html',
                        controller: 'WordsAddController'
                    }
                }
            });
    })

    .factory('AddWordSvc', function(){

        var service = {};
        service.name = '';
        service.type = '';
        service.vulgar = false;
        service.definition = '';
        service.origin = '';
        service.examples = [{content:'', meaning:''}];
        service.tags = [''];
        service.countries = [''];

        service.addExample = function(){
                    service.examples.push({content:'', meaning:''});
                };

        service.removeExample = function(index){
                    if(service.examples.length > 1){
                        service.examples.splice(index, 1);
                    }
                };

        service.addCountry = function(){
                    service.countries.push('');
                };

        service.removeCountry = function(index){
                    if(service.countries.length > 1){
                        service.countries.splice(index, 1);
                    }
                };

        service.addTag = function(){
                    service.tags.push('');
                };

        service.saveWord = function(){
                    console.log("save word");
                };

        service.removeTag = function(index){
                    if(service.tags.length > 1){
                        service.tags.splice(index, 1);
                    }
                };

        service.saveWord = function(word){
                    console.log(JSON.stringify(word, null, '\t'));
                };

        return service;
    })

    .controller('WordsAddController', function ($scope, AddWordSvc) {

        $scope.word = AddWordSvc;

        $scope.addExample = function(){
            AddWordSvc.addExample();
        };

        $scope.removeExample = function(index){
            AddWordSvc.removeExample(index);
        };

        $scope.addCountry = function(){
            AddWordSvc.addCountry();
        };

        $scope.removeCountry = function(index){
            AddWordSvc.removeCountry(index);
        };

        $scope.addTag = function(){
            AddWordSvc.addTag();
        };

        $scope.removeTag = function(index){
            AddWordSvc.removeTag(index);
        };

        $scope.consoleword = function(word){
            AddWordSvc.saveWord(word);
        };

    })
;