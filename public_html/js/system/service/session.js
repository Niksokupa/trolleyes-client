'use strict';



moduleService.service('sessionService', ['$location', function ($location) {
        var isSessionActive = false;
        var userName = "";
        var idUserLogged = "";
        var admin = false;
        var carrito = 0;
        return {
            getUserName: function () {
                return userName;
            },
            setUserName: function (name) {
                userName = name;
            },
            isSessionActive: function () {
                return isSessionActive;
            },
            setSessionActive: function (name) {
                isSessionActive = true;
            },
            setSessionInactive: function (name) {
                isSessionActive = false;
            },
            setId: function (id) {
                idUserLogged = id;
            },
            getId: function () {
                return idUserLogged;
            },
            clean: function () {
                isSessionActive = false;
                userName = "";
                idUserLogged = "";
            },
            isAdmin: function () {
                return admin;
            },
            setAdmin: function () {
                admin = true;
            },
            setUser: function () {
                admin = false;
            },
            setCountCarrito: function (cantidad) {
                carrito = cantidad;
            },
            getCountCarrito: function () {
                return carrito;
            }
        }

    }]);