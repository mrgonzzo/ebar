(function (angular) {

  angular.module('app').component('compKitchen', {
    // otra opción es poner aquí directamente el html asignándoselo a template:
    templateUrl: 'app/components/kitchen/kitchen.html',
    // en controller definimos la función que escribimos abajo
    controller: [ '$timeout', '$websocket', 'wsFactory', controllerCompKitchen],
    // declaramos un alias para no tener que usar $ctrl.
    controllerAs: 'compKitchen'
  });

  function controllerCompKitchen( $timeout, $websocket, wsFactory) {
    var vm = this;
    console.log('waiting order data', data)
    vm.message = wsFactory.ws.onMessage(data);
    console.log('waiting order data', data)
    
  };
})(angular)