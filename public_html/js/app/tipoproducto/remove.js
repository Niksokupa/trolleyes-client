"use strict";

moduleTipoproducto.controller('tipoproductoRemoveController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService', '$anchorScroll',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService, $anchorScroll) {
        $anchorScroll();
        $scope.deleted = true;
        $scope.logged = false;
        $http({
            method: "GET",
            url: `http://localhost:8081/trolleyes/json?ob=tipoproducto&op=get&id=${$routeParams.id}`
        }).then(function (response) {
            $scope.ajaxData = response.data.message;
        });

        $scope.eliminar = function () {
            $http({
                method: "GET",
                url: `http://localhost:8081/trolleyes/json?ob=tipoproducto&op=remove&id=${$routeParams.id}`
            }).then(function (response) {
                $scope.deleted = false;
            });
        };

        if (oSessionService.getUserName() !== "") {
            $scope.loggeduser = oSessionService.getUserName();
            $scope.loggeduserid = oSessionService.getId();
            $scope.logged = true;
        }

        $scope.isActive = toolService.isActive;
    }

]);