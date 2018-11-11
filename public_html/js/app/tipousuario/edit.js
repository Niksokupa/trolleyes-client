"use strict";

moduleTipousuario.controller("tipousuarioEditController", [
    "$scope",
    "$http",
    "$routeParams",
    "toolService",
    function ($scope, $http, $routeParams, toolService) {
        $scope.edited = true;

        $http({
            method: "GET",
            url: `http://localhost:8081/trolleyes/json?ob=tipousuario&op=get&id=${$routeParams.id}`
        }).then(function (response) {
            console.log(response);
            $scope.id = response.data.message.id;
            $scope.desc = response.data.message.desc;
        }), function (response) {
            console.log(response);
        };

        $scope.update = function () {
            var json = {
                id: $scope.id,
                desc: $scope.desc
            }
            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=tipousuario&op=update',
                params: {json: JSON.stringify(json)}
            }).then(function () {
                $scope.edited = false;
            })
        }
        $scope.isActive = toolService.isActive;
    }
]);