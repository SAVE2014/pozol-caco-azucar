angular.module('admin.cars', [])

    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('admin.cars', {
                url: 'cars',
                views: {
                    'main@admin': {
                        templateUrl: 'cars/cars.tpl.html',
                        controller: 'CarsController'
                    }
                }
            });
    })

    .factory('CarsSvc', function(Restangular){
        return Restangular.all('cars').getList().$object;
    })

    .factory('EditCarSvc', function(growl){
        var service = {};

        service.car = {};

        service.setCar = function(car){
            service.car = car;
        };

        service.updateCar = function(){
            service.car.put().then(function() {
                    growl.addSuccessMessage("Articulo editado exitosamente");
                }, function() {
                    growl.addErrorMessage("Error al editar articulo");
            });
        };

        service.deleteCar = function(){
            service.car.remove().then(function() {
                    growl.addSuccessMessage("Articulo borrado exitosamente");
                }, function() {
                    growl.addErrorMessage("Error al borrar articulo");
            });
        };

        return service;
    })


    .controller('CarsController', function ($scope, CarsSvc, EditCarSvc) {
        $scope.cars = CarsSvc;

        $scope.editCar = EditCarSvc;

        $scope.editView = false;

        $scope.disableInputs = true;


        $scope.hideDetails = function(){
            $scope.editView = false;
            $scope.disableInputs = true;
        };

        $scope.setEditCar = function(car){
            $scope.editView = true;
            $scope.disableInputs = true;
            EditCarSvc.setCar(car);
        };

        $scope.saveCar = function(){
            EditCarSvc.updateCar();
            $scope.disableInputs = true;
        };

        $scope.deleteCar = function(){
            EditCarSvc.deleteCar();
            $scope.disableInputs = true;
        };

    })
;




