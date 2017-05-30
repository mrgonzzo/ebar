(function (angular) {

  angular.module('app').component('compOrder', {
    // otra opción es poner aquí directamente el html asignándoselo a template:
    templateUrl: 'app/components/order/order.html',
    // en controller definimos la función que escribimos abajo
    controller: ['$state', '$timeout', 'userFactory', 'scoreFactory', controllerCompOrder],
    // declaramos un alias para no tener que usar $ctrl.
    controllerAs: 'compOrder'
  });

  function controllerCompOrder($state, $timeout, userFactory, scoreFactory) {
    var vm = this;
    
    vm.goToOrder = function () {
      $state.go('Order', {}, { reload: true });
    }
    
  };

})(angular)