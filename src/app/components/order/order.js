(function (angular) {

  angular.module('app').component('compOrder', {
    // otra opción es poner aquí directamente el html asignándoselo a template:
    templateUrl: 'app/components/order/order.html',
    // en controller definimos la función que escribimos abajo
    controller: ['$state', '$timeout', 'userFactory', 'drinkFactory', controllerCompOrder],
    // declaramos un alias para no tener que usar $ctrl.
    controllerAs: 'compOrder'
  });

  function controllerCompOrder($state, $timeout, userFactory, drinkFactory) {
    var vm = this;
    vm.user=userFactory.logeduser;
    drinkFactory.getDrink().then(function(data){
        vm.drinks=data;
        console.log('vm.drinks',vm.drinks);
    });
    vm.goToOrder = function () {
      $state.go('Order', {}, { reload: true });
    }
    
  };

})(angular)