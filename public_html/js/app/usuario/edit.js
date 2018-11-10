"use strict";

moduleUsuario.controller("usuarioEditController", [
  "$scope",
  "$http",
  "$routeParams",
  "toolService",
  function ($scope, $http, $routeParams, toolService) {
    $http({
      method: "GET",
      url: `http://localhost:8081/trolleyes/json?ob=usuario&op=get&id=${$routeParams.id}`
    }).then(function (response) {
      console.log(response);
      $scope.id = response.data.message.id;
      $scope.dni = response.data.message.dni;
      $scope.nombre = response.data.message.nombre;
      $scope.ape1 = response.data.message.ape1;
      $scope.ape2 = response.data.message.ape2;
      $scope.login = response.data.message.login;
      $scope.pass = 'meh';
      $scope.obj_tipoUsuario_desc = response.data.message.obj_tipoUsuario.desc;
      $scope.obj_tipoUsuario_id = response.data.message.obj_tipoUsuario.id;
    }), function (response) {
      console.log(response);
    };

$scope.isActive = toolService.isActive;

    $scope.update = function () {
      var json = {
        id: $scope.id,
        dni: $scope.dni,
        nombre: $scope.nombre,
        ape1: $scope.ape1,
        ape2: $scope.ape2,
        login: $scope.login,
        pass: $scope.pass,
        id_tipoUsuario: $scope.obj_tipoUsuario_id
      }
      $http({
        method: 'GET',
        header: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=update',
        params: { json: JSON.stringify(json) }
      }).then(function (data, response) {
        console.log(data, response);
      }), function (response) {
        console.log(response);
      }
    }


  }
]);
