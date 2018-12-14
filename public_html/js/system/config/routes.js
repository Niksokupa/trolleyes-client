var autenticacionAdministrador = function ($q, $location, $http, sessionService) {
    var deferred = $q.defer();
    $http({
        method: 'GET',
        url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=check'
    }).then(function (response) {
        if (response.data.status == 200) {
            sessionService.setSessionActive();
            sessionService.setUserName(response.data.message.nombre + " " + response.data.message.ape1);
            sessionService.setId(response.data.message.id);
            if (response.data.message.obj_tipoUsuario.desc === "Administrador") {
                sessionService.setAdmin();
            } else {
                $location.path('/home');
            }
            //comprobar que el usuario en sesión es administrador
            //hay que meter el usuario activo en el sessionService
            deferred.resolve();
        } else {
            $location.path('/home');
        }
    }, function (response) {
        $location.path('/home');
    });
    return deferred.promise;
};

var autenticacionUsuario = function ($q, $location, $http, sessionService, countcarritoService) {
    var deferred = $q.defer();
    $http({
        method: 'GET',
        url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=check'
    }).then(function (response) {
        sessionService.setSessionActive();
        sessionService.setUserName(response.data.message.nombre + " " + response.data.message.ape1);
        sessionService.setId(response.data.message.id);
        if (response.data.status == 200) {
            if (response.data.message.obj_tipoUsuario.desc !== "Administrador") {
                sessionService.setUser();
            } else {
                $location.path('/home');
            }
            //comprobar que el usuario en sesión es usuario
            //hay que meter el usuario activo en el sessionService
            countcarritoService.updateCarrito();
            deferred.resolve();
        } else {
            $location.path('/home');
        }
    }, function (response) {
        $location.path('/home');
    });
    return deferred.promise;
};

trolleyes.config(['$routeProvider', function ($routeProvider) {

        //HOME
        $routeProvider.when('/home', {templateUrl: 'js/app/common/home.html', controller: 'homeController'});

        //TIPOUSUARIO
        $routeProvider.when('/tipousuario/plist', {templateUrl: 'js/app/tipousuario/plist.html', controller: 'tipousuarioPlistController'});
        $routeProvider.when('/tipousuario/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/tipousuario/plist.html', controller: 'tipousuarioPlistController'});
        $routeProvider.when('/tipousuario/edit/:id', {templateUrl: 'js/app/tipousuario/edit.html', controller: 'tipousuarioEditController'});
        $routeProvider.when('/tipousuario/view/:id', {templateUrl: 'js/app/tipousuario/view.html', controller: 'tipousuarioViewController'});
        $routeProvider.when('/tipousuario/remove/:id', {templateUrl: 'js/app/tipousuario/remove.html', controller: 'tipousuarioRemoveController'});
        $routeProvider.when('/tipousuario/new', {templateUrl: 'js/app/tipousuario/new.html', controller: 'tipousuarioNewController'});

        //USUARIO
        $routeProvider.when('/usuario/plist', {templateUrl: 'js/app/usuario/plist.html', controller: 'usuarioPlistController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/new', {templateUrl: 'js/app/usuario/new.html', controller: 'usuarioNewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/login', {templateUrl: 'js/app/usuario/login.html', controller: 'usuarioLoginController'});
        $routeProvider.when('/usuario/logout', {templateUrl: 'js/app/usuario/logout.html', controller: 'usuarioLogoutController'});
        $routeProvider.when('/usuario/view/:id', {templateUrl: 'js/app/usuario/view.html', controller: 'usuarioViewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/edit/:id', {templateUrl: 'js/app/usuario/edit.html', controller: 'usuarioEditController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/remove/:id', {templateUrl: 'js/app/usuario/remove.html', controller: 'usuarioRemoveController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/usuario/plist.html', controller: 'usuarioPlistController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/changepass', {templateUrl: 'js/app/usuario/changepass.html', controller: 'usuarioChangePassController'});
        $routeProvider.when('/usuario/facturas', {templateUrl: 'js/app/usuario/facturas_usuario.html', controller: 'usuarioFacturasUsuarioController'});

        //FACTURA
        $routeProvider.when('/factura/plist', {templateUrl: 'js/app/factura/plist.html', controller: 'facturaPlistController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/factura/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/factura/plist.html', controller: 'facturaPlistController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/factura/new/:id?', {templateUrl: 'js/app/factura/new.html', controller: 'facturaNewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/factura/view/:id', {templateUrl: 'js/app/factura/view.html', controller: 'facturaViewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/factura/edit/:id', {templateUrl: 'js/app/factura/edit.html', controller: 'facturaEditController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/factura/remove/:id', {templateUrl: 'js/app/factura/remove.html', controller: 'facturaRemoveController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/:id/factura/plistspecific/:rpp?/:page?/:order?', {templateUrl: 'js/app/factura/plistspecific.html', controller: 'facturaPlistspecificController', resolve: {auth: autenticacionAdministrador}});

        //LINEA
        $routeProvider.when('/factura/:id/linea/plist', {templateUrl: 'js/app/linea/plist.html', controller: 'lineaPlistController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/factura/:id/linea/new', {templateUrl: 'js/app/linea/new.html', controller: 'lineaNewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/linea/view/:id', {templateUrl: 'js/app/linea/view.html', controller: 'lineaViewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/linea/edit/:id', {templateUrl: 'js/app/linea/edit.html', controller: 'lineaEditController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/linea/remove/:id', {templateUrl: 'js/app/linea/remove.html', controller: 'lineaRemoveController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/factura/:id/linea/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/linea/plist.html', controller: 'lineaPlistController', resolve: {auth: autenticacionAdministrador}});

        //TIPOPRODUCTO
        $routeProvider.when('/tipoproducto/plist', {templateUrl: 'js/app/tipoproducto/plist.html', controller: 'tipoproductoPlistController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipoproducto/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/tipoproducto/plist.html', controller: 'tipoproductoPlistController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipoproducto/new', {templateUrl: 'js/app/tipoproducto/new.html', controller: 'tipoproductoNewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipoproducto/view/:id', {templateUrl: 'js/app/tipoproducto/view.html', controller: 'tipoproductoViewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipoproducto/edit/:id', {templateUrl: 'js/app/tipoproducto/edit.html', controller: 'tipoproductoEditController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipoproducto/remove/:id', {templateUrl: 'js/app/tipoproducto/remove.html', controller: 'tipoproductoRemoveController', resolve: {auth: autenticacionAdministrador}});

        //PRODUCTO
        $routeProvider.when('/producto/plist', {templateUrl: 'js/app/producto/plist.html', controller: 'productoPlistController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/producto/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/producto/plist.html', controller: 'productoPlistController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/producto/view/:id?', {templateUrl: 'js/app/producto/view.html', controller: 'productoViewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/producto/edit/:id?', {templateUrl: 'js/app/producto/edit.html', controller: 'productoEditController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/producto/remove/:id?', {templateUrl: 'js/app/producto/remove.html', controller: 'productoRemoveController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/producto/new', {templateUrl: 'js/app/producto/new.html', controller: 'productoNewController', resolve: {auth: autenticacionAdministrador}});

        //COMPRARPRODUCTOS
        $routeProvider.when('/comprar_productos/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/comprar_productos/plist.html', controller: 'comprarproductoPlistController', resolve: {auth: autenticacionUsuario}});
        $routeProvider.when('/comprar_productos/comprar', {templateUrl: 'js/app/comprar_productos/comprar.html', controller: 'comprarPlistController', resolve: {auth: autenticacionUsuario}});


        //DEFAULT
        $routeProvider.otherwise({redirectTo: '/home'});
    }]);
