moduloDirectivas.component('caddModalVar', {
    //restrict: 'A',
    templateUrl: 'js/app/components/cmodal/cmodal.html',
    bindings: {
        data: '=',
        tabla: '<'
    },
    controllerAs: 'c',
    controller: addModalVarController
});

//Articulo interesante sobre $oninit
//https://toddmotto.com/on-init-require-object-syntax-angular-component/
//Entiendo que el oninit es para cargar la tabla cuando carge el componente padre asi no tener que esperar la respuesta del servidor cada vez que pinche en el modal

function addModalVarController($http) {
    var self = this;

    self.$onInit = function () {
        console.log('Modal cargado');
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

    //Ordenar ascendentemente o descendentemente
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
    //Cuando pincho en el ojo se ejecuta esto
    self.modal_data = function () {
        //getcount
        $http({
            method: 'GET',
            url: `http://localhost:8081/trolleyes/json?ob=${self.tabla}&op=getcount`
        }).then(function (response) {
            self.status = response.status;
            self.ajaxDataUsuariosNumber = response.data.message;
            self.totalPages = Math.ceil(self.ajaxDataUsuariosNumber / self.rpp);
            if (self.page > self.totalPages) {
                self.page = self.totalPages;
            }
            pagination2();
        }, function (response) {
            self.ajaxDataUsuariosNumber = response.data.message || 'Request failed';
            self.status = response.status;
        });
        //Obtengo los datos con 5 registros por pagina y que se ponga en la primera pagina
        $http({
            method: 'GET',
            url: `http://localhost:8081/trolleyes/json?ob=${self.tabla}&op=getpage&rpp=${self.rpp}&page=${self.page}${self.orderURLServidor}`
        }).then(function (response) {
            self.modal = response.data.message;
        }, function (response) {
            self.status = response.status;
            self.ajaxDataUsuarios = response.data.message || 'Request failed';
        });
    }

    //Cargo los datos dependiendo de en que pagina este
    self.pagination_destino = function (pagina) {
        self.page = pagina;
        self.modal_data();
    }

    //Cuando cambio de reguistros se ejecuta esto y el valor del select se guarda en self.registros_modal
    //Reseteo la pagina para que empiece en la primera
    self.update_registro = function (rpp) {
        self.rpp = rpp;
        self.page = 1;
        self.modal_data();
    }

    //Guardo lo seleccionado en el model para pasarlo a la pantalla principal
    self.selected = function (id, fila) {
        self.data = {
            id: id,
            desc: fila
        };
        console.log(self.data);
    }

    self.resetAll = function () {
        self.rpp = "";
        self.page = "";

    }
}

