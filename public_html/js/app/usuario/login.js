"use strict";

moduleUsuario.controller("usuarioLoginController", [
    "$scope",
    "$http",
    "$routeParams",
    "toolService",
    function ($scope, $http, $routeParams, toolService) {
        $scope.logged = false;
        $scope.failedlogin = false;
        $scope.logging = function () {
            
                var login = $scope.login;
                var pass = $scope.pass;
            

            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=login&user='+login+'&pass='+pass
            }).then(function (response, data) {
                $scope.logged = true;
                $scope.failedlogin = false;
            }, function (response) {
                $scope.failedlogin = true;
            });
        }
        $scope.isActive = toolService.isActive;
    }
]);