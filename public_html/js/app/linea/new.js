"use strict";

moduleLinea.controller("lineaNewController", [
    "$scope",
    "$http",
    "$routeParams",
    "toolService",
    "sessionService",
    function ($scope, $http, $routeParams, toolService, oSessionService) {
        $scope.created = true;
        $scope.logged = false;
        
        $scope.create = function () {
            var json = {
                desc: $scope.desc
            }

            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=linea&op=create',
                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                $scope.created = false;
                $scope.id = response.data.message.id;
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
            });
        }

        if (oSessionService.getUserName() !== "") {
            $scope.loggeduser = oSessionService.getUserName();
            $scope.logged = true;
        }

        $scope.productoRefresh = function (f, consultar) {
            var form = f;
            if (consultar) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:8081/trolleyes/json?ob=producto&op=get&id=' + $scope.obj_producto.id
                }).then(function (response) {
                    $scope.obj_producto = response.data.message;
                    form.userForm.obj_producto.$setValidity('valid', true);
                }, function (response) {
                    form.userForm.obj_producto.$setValidity('valid', false);
                });
            } else {
                form.userForm.obj_producto.$setValidity('valid', true);
            }
        }
        
        $scope.facturaRefresh = function (f, consultar) {
            var form = f;
            if (consultar) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:8081/trolleyes/json?ob=factura&op=get&id=' + $scope.obj_factura.id
                }).then(function (response) {
                    $scope.obj_factura = response.data.message;
                    form.userForm.obj_factura.$setValidity('valid', true);
                }, function (response) {
                    form.userForm.obj_factura.$setValidity('valid', false);
                });
            } else {
                form.userForm.obj_factura.$setValidity('valid', true);
            }
        }

        $scope.isActive = toolService.isActive;
    }
]);