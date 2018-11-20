"use strict";

moduleFactura.controller("facturaEditController", [
    "$scope",
    "$http",
    "$routeParams",
    "toolService",
    "sessionService",
    function ($scope, $http, $routeParams, toolService, oSessionService) {
        $scope.edited = true;
        $scope.logged = false;

        $http({
            method: "GET",
            url: `http://localhost:8081/trolleyes/json?ob=factura&op=get&id=${$routeParams.id}`
        }).then(function (response) {
            $scope.id = response.data.message.id;
            $scope.iva = response.data.message.iva;
            $scope.fecha = response.data.message.fecha;
            $scope.obj_usuario = {
                id: response.data.message.obj_usuario.id,
                nombrecompleto: response.data.message.obj_usuario.nombre + " " + response.data.message.obj_usuario.ape1
            }
        });

        $scope.update = function () {
            var json = {
                id: $scope.id,
                desc: $scope.desc
            }
            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=factura&op=update',
                params: {json: JSON.stringify(json)}
            }).then(function () {
                $scope.edited = false;
            })
        }

        if (oSessionService.getUserName() !== "") {
            $scope.loggeduser = oSessionService.getUserName();
            $scope.logged = true;
        }

        $scope.logout = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=logout'
            }).then(function () {
                $location.url('/');
            });
        }

        $scope.isActive = toolService.isActive;
    }
]);