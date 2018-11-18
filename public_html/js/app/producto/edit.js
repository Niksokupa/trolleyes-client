"use strict";

moduleProducto.controller("productoEditController", [
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
            url: `http://localhost:8081/trolleyes/json?ob=producto&op=get&id=${$routeParams.id}`
        }).then(function (response) {
            $scope.id = response.data.message.id;
            $scope.codigo = response.data.message.codigo;
            $scope.desc = response.data.message.desc;
            $scope.existencias = response.data.message.existencias;
            $scope.precio = response.data.message.precio;
            $scope.foto = response.data.message.foto;
            $scope.obj_tipoProducto_desc = response.data.message.obj_tipoProducto.desc;
            $scope.obj_tipoProducto_id = response.data.message.obj_tipoProducto.id;
        }), function (response) {
            console.log(response);
        };

        $scope.update = function () {
            var json = {
                id: $scope.id,
                codigo: $scope.codigo,
                desc: $scope.desc,
                existencias: $scope.existencias,
                precio: $scope.precio,
                foto: $scope.foto,
                id_tipoProducto: $scope.obj_tipoProducto_id
            }
            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=producto&op=update',
                params: {json: JSON.stringify(json)}
            }).then(function () {
                $scope.edited = false;
            })
        }
        $scope.isActive = toolService.isActive;

        if (oSessionService.getUserName() !== "") {
            $scope.loggeduser = oSessionService.getUserName();
            $scope.logged = true;
        }
    }
]);