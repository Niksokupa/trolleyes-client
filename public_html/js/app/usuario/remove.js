"use strict";

moduleUsuario.controller("usuarioRemoveController", [
    "$scope", 
    "$http", 
    "toolService", 
    "$routeParams",
    function ($scope, $http, toolService, $routeParams) {
        $scope.deleted = true;
        $scope.id = $routeParams.id;
        $http({
            method: "GET",
            url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=get&id=' + $scope.id
        }).then(function (response) {
            $scope.ajaxData = response.data.message;
        }).then /
            function (response) {
            };

        $scope.eliminar = function () {
            $http({
                method: "GET",
                url: `http://localhost:8081/trolleyes/json?ob=usuario&op=remove&id=${$routeParams.id}`
            }).then(function (response) {
                $scope.deleted = false;
            })
        }
        $scope.isActive = toolService.isActive;
    }

]);