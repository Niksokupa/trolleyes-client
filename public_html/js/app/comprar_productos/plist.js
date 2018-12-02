'use strict'

moduleComprarProducto.controller('comprarproductoPlistController', ['$scope', '$http', '$location', 'toolService', '$routeParams', "sessionService", "countcarritoService", "$mdDialog",
    function ($scope, $http, $location, toolService, $routeParams, sessionService, countcarritoService, $mdDialog) {

        $scope.totalPages = 1;

        $scope.advanced = false;

        if (!$routeParams.order) {
            $scope.orderURLServidor = "";
            $scope.orderURLCliente = "";
        } else {
            $scope.orderURLServidor = "&order=" + $routeParams.order;
            $scope.orderURLCliente = $routeParams.order;
        }

        if (!$routeParams.rpp) {
            $scope.rpp = 5;
        } else {
            $scope.rpp = $routeParams.rpp;
        }

        if (!$routeParams.page) {
            $scope.page = 1;
        } else {
            if ($routeParams.page >= 1) {
                $scope.page = $routeParams.page;
            } else {
                $scope.page = 1;
            }
        }

        $http({
            method: 'GET',
            url: `http://localhost:8081/trolleyes/json?ob=${toolService.objects.producto}&op=getpage&rpp=` + $scope.rpp + '&page=' + $scope.page + $scope.orderURLServidor
        }).then(function (response) {
            $scope.status = response.status;
            var productos = [];
            response.data.message.forEach(element => {
                var producto = {
                    producto: element,
                    cantidad: 0
                }
                productos.push(producto);
            });
            $scope.productos = productos;
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
        });

        $scope.advancedSearch = function () {
            if ($scope.advanced == false) {
                $scope.advanced = true;
            } else {
                $scope.advanced = false;
            }
        }

        $scope.save = function (producto) {
            if (producto.cantidad <= 0) {
                $scope.showAlert('Error añadiendo al carrito', 'Añade almenos 1 producto');
            } else if (producto.cantidad > producto.producto.existencias) {
                $scope.showAlert('Error añadiendo al carrito', 'No hay mas existencias');
            }else if(!Number.isInteger(producto.cantidad)){
                $scope.showAlert('Error añadiendo al carrito', 'Introduce caracteres numericos');
            } else {
                $http({
                    method: 'GET',
                    url: `http://localhost:8081/trolleyes/json?ob=carrito&op=add&id=${producto.producto.id}&cant=${producto.cantidad}`
                }).then(function (response) {
                    countcarritoService.updateCarrito();
                    console.log(response);
                }, function (response) {
                    $scope.showAlert('Error', response.data.message);
                });
            }
        }

        $scope.add = function (producto) {
            if (producto.cantidad >= producto.producto.existencias) {
                $scope.showAlert('Error añadiendo productos', 'No hay mas existencias');
            } else {
                producto.cantidad++;
            }
        }

        $scope.reduce = function (producto) {
            if (producto.cantidad <= 0) {
                $scope.showAlert('Error eliminando productos', 'No se puede eliminar mas productos');
            } else {
                producto.cantidad--;
            }
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