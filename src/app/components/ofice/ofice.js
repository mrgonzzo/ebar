(function (angular) {

  angular.module('app').component('compOfice', {
    // otra opción es poner aquí directamente el html asignándoselo a template:
    templateUrl: 'app/components/ofice/ofice.html',
    // en controller definimos la función que escribimos abajo
    controller: [ '$timeout', '$websocket', 'wsFactory', controllerCompOfice],
    // declaramos un alias para no tener que usar $ctrl.
    controllerAs: 'compOfice'
  });

  function controllerCompOfice( $timeout, $websocket, wsFactory) {
    var vm = this;
    vm.message={"message":"hola"};
    var mssg =vm.message;
    /*wsFactory.ws.onMessage(mssg).then(
    console.log('waiting order data', mssg));*/
    
  };
})(angular)