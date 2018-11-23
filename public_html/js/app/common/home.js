'use strict'

moduleCommon.controller('homeController', ['$scope', '$location', 'toolService', 'sessionService',
    function ($scope, $location, toolService, oSessionService) {
        $scope.logged = false;
        $scope.ruta = $location.path();
        $scope.isActive = toolService.isActive;

        if (oSessionService.getUserName() !== "") {
            $scope.loggeduser = oSessionService.getUserName();
            $scope.loggeduserid = oSessionService.getId();
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
    }]);