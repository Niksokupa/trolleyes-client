'use strict';



moduleService.service('sessionService', ['$location', function ($location) {
        var isSessionActive = false;
        var userName = "";
        var idUserLogged = "";
        
        return {
            getUserName: function () {
                return userName;
            },
            setId: function (id) {
                idUserLogged = id;
            },
            getId: function () {
                return idUserLogged;
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
                userName = "";
                idUserLogged = "";
            }
        }

    }]);