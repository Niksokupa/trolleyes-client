"use strict";

moduleUsuario.controller("usuarioNewController", [
    "$scope",
    "$http",
    "$routeParams",
    "toolService",
    function ($scope, $http, $routeParams, toolService) {
        $scope.created = true;
        $scope.create = function () {
            var json = {
                id: $scope.id,
                dni: $scope.dni,
                nombre: $scope.nombre,
                ape1: $scope.ape1,
                ape2: $scope.ape2,
                login: $scope.login,
                pass: $scope.pass,
                id_tipoUsuario: $scope.obj_tipoUsuario_id
            }

            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=create',
                params: {json: JSON.stringify(json)}
            }).then(function (response, data) {
                $scope.created = false;
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
            });
        }
        $scope.isActive = toolService.isActive;
    }
]);