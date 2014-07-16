angular.module('app.front', [])

    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'front/front.tpl.html',
                controller: 'FrontController'
            });
    })

    .filter('fuzzyFilter', function () {
        return function (items, searchText) {

            if (searchText && searchText.length > 1) {

                var pattern = searchText.substring(1).split("").reduce(function(a,b){
                        a = addAccents(a);
                        b = addAccents(b);
                        return a+'[^'+b+']?['+b+']';
                }, '['+addAccents(searchText[0])+']'),
                regex = new RegExp(pattern, "i");

                return _.filter(items, function (item) {
                    return regex.test(item);
                });
            } else {
                return [];
            }
        };
    })

    .filter('highlight', function () {
        return function (text, search) {
            if (search) {
                  var pattern = search.substring(1).split("").reduce(function(a,b){
                        a = addAccents(a);
                        b = addAccents(b);
                        return a+'[^'+b+']?['+b+']';
                }, '['+addAccents(search[0])+']');
                  return text.replace(new RegExp(pattern, 'i'), '<span class="match">$&</span>');
            } else {
              return text;
            }
        };
    })

    .controller('FrontController', function ($scope, wordList) {
        $scope.wordNames  = wordList;
        $scope.search = '';

        $scope.setSearchValue = function(value){
            $scope.searchText = value;
        };

        $scope.check = function(event){
             $scope.search = $scope.searchText;
            console.log(event);
        };

        $scope.currentIndex = -1;


    })

    .directive('hjAutocomplete', function () {
        return {
            scope: {
                "autocomplete": "=",
                "options": "=",
                "index":"="
            },
//            template: '<div class="angucomplete-holder"><input ng-model="searchStr" type="text"  onmouseup="this.select();" ng-focus="resetHideResults()" ng-blur="hideResults()" /><div  class="dropdown" ng-if="showDropdown"><div class="autocomplete-row" ng-repeat="result in results" ng-click="selectResult(result)" ng-mouseover="hoverRow()" ng-class="{\'angucomplete-selected-row\': $index == currentIndex}"><div class="angucomplete-title" ng-if="matchClass" ng-bind-html="result.title"></div></div></div></div>',

            link: function(scope, elem, attrs) {
//                scope.lastSearchTerm = null;
//                scope.currentIndex = null;
//                scope.justChanged = false;
//                scope.searching = false;
//
//                $scope.hideResults = function() {
//                    scope.showDropdown = false;
//                };
//
//                $scope.hoverRow = function(index) {
//                    scope.currentIndex = index;
//                };
//
//                scope.keyPressed = function(event) {
//                    if (!(event.which == 38 || event.which == 40 || event.which == 13)) {
//                        if (!scope.searchStr || scope.searchStr == "") {
//                            scope.showDropdown = false;
//                            scope.lastSearchTerm = null
//                        } else if (isNewSearchNeeded(scope.searchStr, scope.lastSearchTerm)) {
//                            scope.lastSearchTerm = scope.searchStr;
//                            scope.showDropdown = true;
//                            scope.currentIndex = -1;
//                            scope.results = [];
//
//                            scope.searching = true;
//
//                        }
//                    } else {
//                        event.preventDefault();
//                    }
//                };
//
//                scope.selectResult = function(result) {
//                    scope.selectedObject = result;
//                    scope.showDropdown = false;
//                    //$scope.$apply();
//                };

//                var inputField = elem.find('input');
//
//                inputField.on('keyup', $scope.keyPressed);

                elem.on("keyup", function (event) {

                    if(!scope.options){
                        scope.index = -1;
                    }

                    if(event.which === 40) {
                        //DOWN
                        if (scope.options && (scope.index + 1) < scope.options) {
                            scope.index++;
                            scope.$apply();
                            event.preventDefault();
                            event.stopPropagation();
                            console.log(40);
                        }

                    } else if(event.which == 38) {
                        //UP
                        if (scope.index >= 1) {
                            scope.index--;
                            scope.$apply();
                            event.preventDefault();
                            event.stopPropagation();
                            console.log(38);
                        }
                    } else if (event.which == 13) {
                        //ENTER
//                        if (scope.results && scope.currentIndex >= 0 && scope.currentIndex < scope.results.length) {
//                            scope.selectResult(scope.results[scope.currentIndex]);
//                            scope.$apply();
//                            event.preventDefault();
//                            event.stopPropagation();
//                        } else {
//                            scope.results = [];
//                            scope.$apply();
//                            event.preventDefault();
//                            event.stopPropagation();
//                        }
                        console.log(13);

                    } else if (event.which == 27) {
                        //ESC
//                        scope.results = [];
//                        scope.showDropdown = false;
//                        scope.$apply();
                        console.log(27);
                    } else if (event.which == 8) {
                        //DELETE
//                        scope.selectedObject = null;
//                        scope.$apply();
                        console.log(8);
                    }
                });

            }
        };
    })
;

addAccents = function(option){
    if(/[a|e|i|o|u|n|?]/i.test(option)){
        switch(option) {
            case 'a':
                option = 'a|á';
                break;
            case 'e':
                option = 'e|é';
                break;
            case 'i':
                option = 'i|í';
                break;
            case 'o':
                option = 'o|ó';
                break;
            case 'u':
                option = 'u|ú|ü';
                break;
            case 'n':
                option = 'n|ñ';
                break;
            case '?':
                option = '¿|?';
                break;
        }
    }
    return option;
};