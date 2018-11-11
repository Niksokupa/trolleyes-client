"use strict";

moduleTipousuario.controller("tipousuarioNewController", [
    "$scope",
    "$http",
    "$routeParams",
    "toolService",
    function ($scope, $http, toolService) {
        $scope.created = true;
        $scope.create = function () {
            var json = {
                desc: $scope.desc
            }

            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=tipousuario&op=create',
                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                $scope.created = false;
                $scope.id = response.data.message.id;
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
            });
        }
        $scope.isActive = toolService.isActive;
    }
]);