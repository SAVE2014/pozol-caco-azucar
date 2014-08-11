angular.module('admin.add', [])

    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('admin.add', {
                url: 'add',
                views: {
                    'main@admin': {
                        templateUrl: 'cars_add/cars_add.tpl.html',
                        controller: 'CarsAddController'
                    }
                }
            });
    })

    .factory('AddCarSvc', function(CarsSvc, growl){

        var factory = {};
        factory.model = '';
        factory.brand = '';
        factory.type = '';
        factory.cylinders = '';
        factory.engine = '';
        factory.price = '';
        factory.power = '';
        factory.airbags = false;
        factory.sunroof = false;
        factory.airBreaks = false;
        factory.gps = false;
        factory.blueTooth = false;
        factory.description = '';
        factory.images = [];

        factory.addImage = function(image){
            factory.images.push(image);
        };

        factory.saveCar = function() {
            CarsSvc.post(angular.copy(factory)).then(function(data) {
                    factory.model = '';
                    factory.brand = '';
                    factory.type = '';
                    factory.cylinders = '';
                    factory.engine = '';
                    factory.price = '';
                    factory.power = '';
                    factory.airbags = false;
                    factory.sunroof = false;
                    factory.airBreaks = false;
                    factory.gps = false;
                    factory.blueTooth = false;
                    factory.description = '';
                    factory.images = [];
                    growl.addSuccessMessage("Vehiculo agregado exitosamente");
                    CarsSvc.push(data);
                }, function() {
                    growl.addErrorMessage("Error al agregar vehiculo");
            });
        };

        return factory;
    })

    .controller('CarsAddController', function ($scope, $upload, AddCarSvc) {

        $scope.addCar = AddCarSvc;

        $scope.saveCar = function(){
            AddCarSvc.saveCar();
        };

        $scope.imageJson = {};

        $scope.onSelectFile = function ($files, resp) {
            var file = $files[0];
            $scope.upload = $upload.upload({
                url: resp.url,
                file: file
            })
            .success(function (data, status, headers, config) {
                 AddCarSvc.addImage(data);
            });
        };

    })
;