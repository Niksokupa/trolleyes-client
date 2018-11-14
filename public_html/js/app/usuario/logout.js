'use strict'

moduleUsuario.controller('usuarioLogoutController', ['$scope', '$http', 'toolService', 'sessionService',
    function ($scope, $http, toolService, oSessionService) {

        if (oSessionService.getUserName() !== "") {
            $scope.loggeduser = oSessionService.getUserName();
            $scope.logged = true;
        }

        $scope.logout = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=logout'
            }).then(function () {
                $scope.logged = false;
            });
        }
                $scope.isActive = toolService.isActive;
    }]);