trolleyes.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/usuario/plist/:rpp?/:page?', {templateUrl: 'js/app/usuario/plist.html', controller: 'usuarioPlistController'});
        $routeProvider.when('/usuario/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/usuario/plist.html', controller: 'usuarioPlistController'});
        
        $routeProvider.when('/', {templateUrl: 'js/app/common/home.html', controller: 'homeController'});
        
        $routeProvider.when('/tipousuario/plist', {templateUrl: 'js/app/tipousuario/plist.html', controller: 'tipousuarioPlistController'});
        $routeProvider.when('/tipousuario/edit/:id?', {templateUrl: 'js/app/tipousuario/edit.html', controller: 'tipousuarioEditController'});
        $routeProvider.when('/tipousuario/view/:id?', {templateUrl: 'js/app/tipousuario/view.html', controller: 'tipousuarioViewController'});
        $routeProvider.when('/tipousuario/remove/:id?', {templateUrl: 'js/app/tipousuario/remove.html', controller: 'tipousuarioRemoveController'});
        
        $routeProvider.when('/usuario/plist', {templateUrl: 'js/app/usuario/plist.html', controller: 'usuarioPlistController'});
        $routeProvider.when('/usuario/view/:id?', {templateUrl: 'js/app/usuario/view.html', controller: 'usuarioViewController'});
        $routeProvider.when('/usuario/edit/:id?', {templateUrl: 'js/app/usuario/edit.html', controller: 'usuarioEditController'});
        $routeProvider.when('/usuario/remove/:id?', {templateUrl: 'js/app/usuario/remove.html', controller: 'usuarioRemoveController'});
        
        $routeProvider.when('/factura/plist', {templateUrl: 'js/app/factura/plist.html', controller: 'facturaPlistController'});
        
        $routeProvider.when('/tipoproducto/plist', {templateUrl: 'js/app/tipoproducto/plist.html', controller: 'tipoproductoPlistController'});
        
        $routeProvider.when('/producto/plist', {templateUrl: 'js/app/producto/plist.html', controller: 'productoPlistController'});
        
        $routeProvider.when('/producto/view/:id?', {templateUrl: 'js/app/producto/view.html', controller: 'productoViewController'});
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
