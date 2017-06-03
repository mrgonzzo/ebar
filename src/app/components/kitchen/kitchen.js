(function (angular) {

  angular.module('app').component('compKitchen', {
    // otra opción es poner aquí directamente el html asignándoselo a template:
    templateUrl: 'app/components/kitchen/kitchen.html',
    // en controller definimos la función que escribimos abajo
    controller: ['$state', '$timeout','$websocket','kitchenFactory', controllerCompKitchen],
    // declaramos un alias para no tener que usar $ctrl.
    controllerAs: 'compKitchen'
  });

  function controllerCompKitchen($state, $timeout,$websocket, kitchenFactory) {
    var vm = this;
    vm.message={};
    

  };

})(angular)