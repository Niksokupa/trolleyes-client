"use strict";

moduleProducto.controller("productoNewController", [
    "$scope",
    "$http",
    "$routeParams",
    "toolService",
    "sessionService",
    function ($scope, $http, $routeParams, toolService, oSessionService) {
        $scope.created = true;
        $scope.logged = false;
        $scope.obj_tipoProducto = {
            id: null,
            desc: null
        }

        $scope.create = function () {
            var json = {
                id: $scope.id,
                codigo: $scope.codigo,
                desc: $scope.desc,
                existencias: $scope.existencias,
                precio: $scope.precio,
                id_tipoProducto: $scope.obj_tipoProducto.id
            }

            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=producto&op=create',
                params: {json: JSON.stringify(json)}
            }).then(function (response, data) {
                $scope.created = false;
                $scope.id = response.data.message.id;
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
            });
        }

        if (oSessionService.getUserName() !== "") {
            $scope.loggeduser = oSessionService.getUserName();
            $scope.loggeduserid = oSessionService.getId();
            $scope.logged = true;
        }

        $scope.tipoProductoRefresh = function (f, consultar) {
            var form = f;
            if (consultar) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:8081/trolleyes/json?ob=tipoproducto&op=get&id=' + $scope.obj_tipoProducto.id
                }).then(function (response) {
                    $scope.obj_tipoProducto = response.data.message;
                    form.userForm.obj_tipoProducto.$setValidity('valid', true);
                }, function (response) {
                    form.userForm.obj_tipoProducto.$setValidity('valid', false);
                });
            } else {
                form.userForm.obj_tipoProducto.$setValidity('valid', true);
            }
        }

        $scope.isActive = toolService.isActive;
    }
]);