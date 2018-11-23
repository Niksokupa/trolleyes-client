'use strict'

moduleFactura.controller('facturaPlistspecificController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {
        $scope.logged = false;
        $scope.ob = "factura";
        $scope.totalPages = 1;
        $scope.userid = $routeParams.id;



        if (!$routeParams.order) {
            $scope.orderURLServidor = "";
            $scope.orderURLCliente = "";
        } else {
            $scope.orderURLServidor = "&order=" + $routeParams.order;
            $scope.orderURLCliente = $routeParams.order;
        }

        if (!$routeParams.rpp) {
            $scope.rpp = 10;
        } else {
            $scope.rpp = $routeParams.rpp;
        }

        if (!$routeParams.page) {
            $scope.page = 1;
        } else {
            if ($routeParams.page >= 1) {
                $scope.page = $routeParams.page;
            } else {
                $scope.page = 1;
            }
        }

        if (oSessionService.getUserName() !== "") {
            $scope.loggeduser = oSessionService.getUserName();
            $scope.loggeduserid = oSessionService.getId();
            $scope.logged = true;
        }

        $scope.resetOrder = function () {
            $location.url($scope.ob + '/plist/' + $scope.rpp + '/' + $scope.page);
        }

        $scope.ordena = function (order, align) {
            if ($scope.orderURLServidor == "") {
                $scope.orderURLServidor = "&order=" + order + "," + align;
                $scope.orderURLCliente = order + "," + align;
            } else {
                $scope.orderURLServidor = $scope.orderURLServidor + "-" + order + "," + align;
                $scope.orderURLCliente = $scope.orderURLCliente + "-" + order + "," + align;
            }
            $location.url($scope.ob + `/plist/` + $scope.rpp + `/` + $scope.page + `/` + $scope.orderURLCliente);
        }

        //getcount

            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob + '&op=getcountspecific&id=' + $scope.userid
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxDataUsuariosNumber = response.data.message;
                if ($scope.ajaxDataUsuariosNumber === 0) {
                    $scope.empty = true;
                } else {
                    $scope.empty = false;
                }
                $scope.totalPages = Math.ceil($scope.ajaxDataUsuariosNumber / $scope.rpp);
                if ($scope.page > $scope.totalPages) {
                    $scope.page = $scope.totalPages;
                    $scope.update();
                }
                pagination2();
            }), function (response) {
                $scope.ajaxDataUsuariosNumber = response.data.message || 'Request failed';
                $scope.status = response.status;
            };



        //getpagespecific
        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob + '&op=getpagespecific&rpp=' + $scope.rpp + '&page=' + $scope.page + $scope.orderURLServidor + '&id=' + $scope.userid
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataUsuarios = response.data.message;
            if ($scope.ajaxDataUsuarios.length > 0) {
                $scope.usuario = $scope.ajaxDataUsuarios[0].obj_usuario.nombre + " " + $scope.ajaxDataUsuarios[0].obj_usuario.ape1 + " (" + $scope.ajaxDataUsuarios[0].obj_usuario.login + ")";
            }
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
        });

        $scope.update = function () {
            $location.url(`usuario/` + $scope.userid + `/` + $scope.ob + `/plistspecific/` + $scope.rpp + `/` + $scope.page + '/' + $scope.orderURLCliente);
        }


        //paginacion neighbourhood
        function pagination2() {
            $scope.list2 = [];
            $scope.neighborhood = 3;
            for (var i = 1; i <= $scope.totalPages; i++) {
                if (i === $scope.page) {
                    $scope.list2.push(i);
                } else if (i <= $scope.page && i >= ($scope.page - $scope.neighborhood)) {
                    $scope.list2.push(i);
                } else if (i >= $scope.page && i <= ($scope.page - -$scope.neighborhood)) {
                    $scope.list2.push(i);
                } else if (i === ($scope.page - $scope.neighborhood) - 1) {
                    $scope.list2.push("...");
                } else if (i === ($scope.page - -$scope.neighborhood) + 1) {
                    $scope.list2.push("...");
                }
            }
        }
        $scope.create = function () {
            $location.url($scope.ob + '/new/' + $scope.userid);
        }
        $scope.isActive = toolService.isActive;
    }



]);