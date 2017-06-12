(function (angular) {

  angular.module('app').component('compOrder', {
    // otra opción es poner aquí directamente el html asignándoselo a template:
    templateUrl: 'app/components/order/order.html',
    // en controller definimos la función que escribimos abajo
    controller: ['$state', '$timeout', '$websocket', 'userFactory', 'drinkFactory', 'orderFactory', 'wsFactory', controllerCompOrder],
    // declaramos un alias para no tener que usar $ctrl.
    controllerAs: 'compOrder'
  });

  function controllerCompOrder($state, $timeout, $websocket, userFactory, drinkFactory, orderFactory, wsFactory) {

    var vm = this;
    vm.user = userFactory.logeduser;
    vm.wsmessage;
    //var wsrcv = wsFactory.ws;
    //  var stompClient = null;
    drinkFactory.getDrink().then(function (data) {
      vm.drinks = data;
    });
    vm.getKinds = function () {
      drinkFactory.getKindByDrink(vm.drinkSelect).then(function (data) {
        vm.kinds = data;
        console.log('vm.kinds', vm.kinds, 'data', data);
      });
    }

    vm.setOrder = function () {
      vm.order = {};
      for (var i = 0; i < vm.kinds.length; i++) {
        if (vm.kinds[i].iddrink === vm.kindSelect) {
          vm.order.idcustomer = vm.user.idcustomer;
          vm.order.iddrink = vm.kinds[i].iddrink;
          vm.order.priceorder = vm.kinds[i].pricedrink
          vm.selkind = vm.kinds[i].kind;
          console.log('vm.order', vm.order);
          break;
        }
      }//end for

      return vm.order;
    };
    vm.askOrder = function () {

      console.log('asking order executing ', vm.order);
      orderFactory.saveOrder(vm.order).then(function (data) {
        var ordertosend = data.idorder;
        
        // wsFactory.getOrders(ordertosend);
        wsFactory.wsconnect();
        wsFactory.wsonOpen(event)
        wsFactory.sendOrder(data);
        wsFactory.wsonMessage(event);
        wsFactory.showOrder();
      });

      vm.order = {};
      vm.kinds = null;
      vm.selkind = '';
      vm.kindSelect = '';
      vm.drinkSelect = '';
    }

  };

})(angular)