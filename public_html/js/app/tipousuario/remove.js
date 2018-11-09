moduleTipousuario.controller('tipousuarioRemoveController', ['$scope', '$http', '$location', 'toolService', '$routeParams',
    function ($scope, $http, $location, toolService, $routeParams) {
        $scope.deleted = true;
        $http({
            method: "GET",
            url: `http://localhost:8081/trolleyes/json?ob=tipousuario&op=get&id=${$routeParams.id}`
        }).then(function (response) {
            $scope.ajaxData = response.data.message;
        }).then /
            function (response) {
            };

        $scope.eliminar = function () {
            $http({
                method: "GET",
                url: `http://localhost:8081/trolleyes/json?ob=tipousuario&op=remove&id=${$routeParams.id}`
            }).then(function (response) {
                $scope.deleted = false;
            })
        }
        $scope.isActive = toolService.isActive;
    }

]);