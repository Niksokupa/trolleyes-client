moduleComponent.component('headerComponent', {
    //restrict: 'A',
    templateUrl: 'js/system/components/header/header.html',
    bindings: {
        // data: '=',
        // tabla: '<'
        eventlistener: '&'
    },
    controllerAs: 'c',
    controller: js
});

function js(toolService, sessionService) {
    var self = this;

    self.logged = sessionService.isSessionActive();
    self.name = sessionService.getUserName();
    self.idUserLogged = sessionService.getId();
    self.isActive = toolService.isActive;
    self.isAdmin = sessionService.isAdmin();
    self.carrito = sessionService.getCountCarrito();

    sessionService.registerObserverCallback(function () {
        self.carrito = sessionService.getCountCarrito();
    })
    sessionService.registerObserverCallback(function () {
        self.logged = sessionService.isSessionActive();
    })

}