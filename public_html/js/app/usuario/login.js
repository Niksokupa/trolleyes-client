"use strict";

moduleUsuario.controller("usuarioLoginController", [
    "$scope",
    "$http",
    "$routeParams",
    "toolService",
    "sessionService",
    function ($scope, $http, $routeParams, toolService, oSessionService) {
        $scope.logged = false;
        $scope.failedlogin = false;
        $scope.logging = function () {

            var login = $scope.login;
            var pass = forge_sha256($scope.pass);


            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=login&user=' + login + '&pass=' + pass
            }).then(function (response, data) {
                if (response.data.status == 401) {
                    $scope.failedlogin = true;
                } else {
                    $scope.logged = true;
                    $scope.failedlogin = false;
                    oSessionService.setUserName(response.data.message.nombre + " " + response.data.message.ape1);
                    $scope.loggeduser = oSessionService.getUserName();
                }

            }, function (response) {

            });
        }
        $scope.isActive = toolService.isActive;
    }
]);