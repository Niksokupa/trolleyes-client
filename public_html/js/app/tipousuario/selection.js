'use strict'
moduleComponent.component('tipousuarioSelection', {
    templateUrl: 'js/app/tipousuario/selection.html',
    controllerAs: 'c',
    controller: cController,
    bindings: {
        obj: '=',
        onTipousuarioSet: '&'
    },
});

function cController($http) {
    var self = this;
    self.ob = "tipousuario";
    self.page = 1;
    self.totalPages = 1;
    self.orderURLServidor = "";
    self.rpp = 10;

    self.$onInit = function () {
        //Definir page y rpp por defecto cuando entro la primera vez al modal
        if (!self.rpp) {
            self.rpp = 5;
        }
        if (!self.page) {
            self.page = 1;
        }
        self.orderURLServidor = "";

        self.modal_data()

    }

    //paginacion neighbourhood
    function pagination2() {
        self.list2 = [];
        self.neighborhood = 2;
        for (var i = 1; i <= self.totalPages; i++) {
            if (i === self.page) {
                self.list2.push(i);
            } else if (i <= self.page && i >= (self.page - self.neighborhood)) {
                self.list2.push(i);
            } else if (i >= self.page && i <= (self.page - -self.neighborhood)) {
                self.list2.push(i);
            } else if (i === (self.page - self.neighborhood) - 1) {
                self.list2.push("...");
            } else if (i === (self.page - -self.neighborhood) + 1) {
                self.list2.push("...");
            }
        }
    }

    self.ordena = function (order, align) {
        if (self.orderURLServidor == "") {
            self.orderURLServidor = "&order=" + order + "," + align;
            self.orderURLCliente = order + "," + align;
        } else {
            self.orderURLServidor = self.orderURLServidor + "-" + order + "," + align;
            self.orderURLCliente = self.orderURLCliente + "-" + order + "," + align;
        }
        self.modal_data();
    }

    $http({
        method: 'GET',
        url: 'http://localhost:8081/trolleyes/json?ob=' + self.ob + '&op=getcount'
    }).then(function (response) {
        self.status = response.status;
        self.ajaxDataUsuariosNumber = response.data.message;
        self.totalPages = Math.ceil(self.ajaxDataUsuariosNumber / self.rpp);
        if (self.page > self.totalPages) {
            self.page = self.totalPages;
        }
    }, function (response) {
        self.ajaxDataUsuariosNumber = response.data.message || 'Request failed';
        self.status = response.status;
    });

    $http({
        method: 'GET',
        url: 'http://localhost:8081/trolleyes/json?ob=' + self.ob + '&op=getpage&rpp=' + self.rpp + '&page=' + self.page + self.orderURLServidor
    }).then(function (response) {
        self.status = response.status;
        self.data = response.data.message;
    }, function (response) {
        self.status = response.status;
        self.data = response.data.message || 'Request failed';
    });

    self.save = function (id, desc) {
        self.obj.id = id;
        self.obj.desc = desc;
        self.onTipousuarioSet();
    };


}



