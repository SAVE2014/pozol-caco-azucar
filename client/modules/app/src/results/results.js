angular.module('app.results', ['ngRoute'])

    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('search.results', {
                url: '/:type/:cylinders/:minPrice/:maxPrice',
                'views': {
                    'main@':{
                        templateUrl: 'results/results.tpl.html',
                        controller: 'ResultsController'
                    }
                }
            });
    })

    .factory('ResultsSvc', function(Restangular, $stateParams){

        var factory = {};

        factory.getall = function(params){
            return Restangular.all('cars').getList(params).$object;
        };

        factory.getone = function(id){
            return Restangular.one('cars', id).get().$object;
        };

        return factory;
    })

    .factory('RequestSvc', function(Restangular){
        var factory = {};
        factory.name = '';
        factory.email = '';
        factory.phone = '';
        factory.comments = '';
        factory.cars = [];

        factory.addCar = function(car){
            factory.cars.push(car);
        };

        factory.deleteCar = function(car){
            factory.cars.splice(factory.cars.indexOf(car), 1);
        };

        factory.isSelected = function(car){
            return factory.cars.indexOf(car) + 1;
        };

        factory.sendRequest = function(){
            console.log(angular.copy(factory));
            Restangular.all('requests').post(angular.copy(factory)).then(function(){
                console.log('success!!');
                factory.name = '';
                factory.email = '';
                factory.phone = '';
                factory.comments = '';
                factory.cars = [];
            }, function(){
                console.log('error!!');
            });
        };

        return factory;
    })

    .controller('ResultsController', function($scope, RequestSvc, ResultsSvc, $stateParams) {

        var params = {
            type: $stateParams.type,
            cylinders: $stateParams.cylinders,
            minPrice: $stateParams.minPrice,
            maxPrice: $stateParams.maxPrice
        };

        $scope.items = ResultsSvc.getall(params);

        $scope.request = RequestSvc;

        $scope.addCar = function(car){
            RequestSvc.addCar(car);
        };

        $scope.deleteCar = function(index){
            RequestSvc.deleteCar(index);
        };

        $scope.selected = function (car) {
            return RequestSvc.isSelected(car);
        };

        $scope.sendRequest = function(){
            RequestSvc.sendRequest();
        };

    })
;