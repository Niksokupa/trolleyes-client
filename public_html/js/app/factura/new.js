"use strict";

moduleFactura.controller("facturaNewController", [
    "$scope",
    "$http",
    "$routeParams",
    "toolService",
    "sessionService",
    function ($scope, $http, $routeParams, toolService, oSessionService) {
        $scope.created = true;
        $scope.logged = false;
        $scope.obj_usuario.id = $routeParams.id;
        $scope.create = function () {
            var json = {
                id: $scope.id,
                fecha: $scope.fecha,
                iva: $scope.iva,
                id_usuario: $scope.obj_usuario.id,
            }

            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=factura&op=create',
                params: {json: JSON.stringify(json)}
            }).then(function (response, data) {
                $scope.created = false;
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
            });
        }
        
        if (oSessionService.getUserName() !== "") {
            $scope.loggeduser = oSessionService.getUserName();
            $scope.logged = true;
        }

        $scope.isActive = toolService.isActive;
    }
]);