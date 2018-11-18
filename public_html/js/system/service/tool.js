'use strict';



moduleService.service('toolService', ['$location', function ($location) {

        return {
            isActive: function (p) {
                return $location.path().startsWith(p);
            },
            goBack: function (){
                window.history.back();
            },
            objects: {
                usuario: 'usuario',
                tipousuario: 'tipousuario',
                producto: 'producto',
                tipoproducto: 'tipoproducto',
                factura: 'factura',
                linea: 'linea'
            }
        }

    }]);