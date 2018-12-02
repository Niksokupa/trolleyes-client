moduleComprarProducto.controller('comprarPlistController', ['$scope', '$http', '$location', 'toolService', '$routeParams', "sessionService", "countcarritoService", "$mdDialog",
    function ($scope, $http, $location, toolService, $routeParams, sessionService, countcarritoService, $mdDialog) {

        $scope.carritoVacio = false;
        $http({
            method: 'GET',
            url: `http://localhost:8081/trolleyes/json?ob=carrito&op=show`
        }).then(function (response) {
            if (response.data.message != null) {
                $scope.productos = response.data.message;
                $scope.total = 0;
                var auxCant = 0;
                var auxPrecio = 0;
                var totalInicial = 0;
                for (var i = 0; i < response.data.message.length; i++) {
                    auxCant = response.data.message[i].cantidad;
                    auxPrecio = response.data.message[i].obj_producto.precio;

                    totalInicial += auxCant * auxPrecio;
                }
                $scope.total = Math.round(totalInicial * 100) / 100;
            } else {
                $scope.carritoVacio = true;
            }
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
        });

        $scope.carrito = function (operacion, id) {
            $http({
                method: 'GET',
                url: `http://localhost:8081/trolleyes/json?ob=carrito&op=${operacion}&id=${id}&cant=1`
            }).then(function (response) {
                if (response.data.message != null) {
                    $scope.productos = response.data.message;
                    var auxCant = 0;
                    var auxPrecio = 0;
                    var totalModificado = 0;
                    for (var i = 0; i < response.data.message.length; i++) {
                        auxCant = response.data.message[i].cantidad;
                        auxPrecio = response.data.message[i].obj_producto.precio;

                        totalModificado += auxCant * auxPrecio;
                    }
                    $scope.total = Math.round(totalModificado * 100) / 100;
                } else {
                    $scope.carritoVacio = true;
                }
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
            });
        }

        $scope.buy = function () {
            $http({
                method: 'GET',
                url: `http://localhost:8081/trolleyes/json?ob=carrito&op=buy`
            }).then(function (response) {
                $scope.showAlert('Correcto', 'Se ha realizado la compra correctamente');
                $scope.carritoVacio = true;
            }, function (response) {
                $scope.showAlert('Error', response.data.message);
            });
        }

        //Este mensaje se puede mejorar, buscar info en la api oficial de angular material
        //https://material.angularjs.org/latest/api/service/$mdDialog
        //https://ajax.googleapis.com/ajax/libs/angular_material/1.1.8/angular-material.css
        $scope.showAlert = function (titulo, description) {
            $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(false)
                    .title(titulo)
                    .textContent(description)
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK!')
                    );
        };
    }]);