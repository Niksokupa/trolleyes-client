moduleUsuario.controller('usuarioRemoveController', ['$scope', '$http', '$location', 'toolService', '$routeParams',
    function ($scope, $http, toolService, $routeParams) {
        $scope.deleted = true;
        $http({
            method: "GET",
            url: `http://localhost:8081/trolleyes/json?ob=usuario&op=get&id=${
                $routeParams.id
                }`
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