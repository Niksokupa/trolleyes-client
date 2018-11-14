"use strict";

moduleUsuario.controller("usuarioRemoveController", [
    "$scope",
    "$http",
    "toolService",
    "$routeParams",
    "sessionService",
    function ($scope, $http, toolService, $routeParams, oSessionService) {
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
    }

]);