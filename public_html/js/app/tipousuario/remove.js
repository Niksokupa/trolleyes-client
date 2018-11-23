"use strict";

moduleTipousuario.controller('tipousuarioRemoveController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {
        $scope.deleted = true;
        $scope.logged = false;
        $http({
            method: "GET",
            url: `http://localhost:8081/trolleyes/json?ob=tipousuario&op=get&id=${$routeParams.id}`
        }).then(function (response) {
            $scope.ajaxData = response.data.message;
        });

        $scope.eliminar = function () {
            $http({
                method: "GET",
                url: `http://localhost:8081/trolleyes/json?ob=tipousuario&op=remove&id=${$routeParams.id}`
            }).then(function (response) {
                $scope.deleted = false;
            })
        }

        if (oSessionService.getUserName() !== "") {
            $scope.loggeduser = oSessionService.getUserName();
            $scope.loggeduserid = oSessionService.getId();
            $scope.logged = true;
        }

        $scope.isActive = toolService.isActive;
    }

]);