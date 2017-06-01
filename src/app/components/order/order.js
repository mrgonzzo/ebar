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
    vm.user = userFactory.logeduser;
    drinkFactory.getDrink().then(function (data) {
      vm.drinks = data;
    });

    vm.getKinds = function () {
      drinkFactory.getKindByDrink(vm.drinkSelect).then(function (data) {
        vm.kinds = data;
      });
    }

    vm.setOrder = function () {
      vm.order = {};
      for (var i = 0; i < vm.kinds.length; i++) {
        if (vm.kinds[i].id_drink === vm.kindSelect) {
          vm.order = vm.kinds[i];
          break;
        }
      }//end for
      return vm.order;
    };
    vm.askOrder=function(){
      alert('pedido '+  vm.order.drink +' '+ vm.order.kind +' con un precio de '+ vm.order.price_drink+'€, se ha pedido a la barra.')
      console.log('vm.order',vm.order);
    }
    vm.goToOrder = function () {
      $state.go('Order', {}, { reload: true });
    }

  };

})(angular)