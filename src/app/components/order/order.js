(function (angular) {

  angular.module('app').component('compOrder', {
    // otra opción es poner aquí directamente el html asignándoselo a template:
    templateUrl: 'app/components/order/order.html',
    // en controller definimos la función que escribimos abajo
    controller: ['$state', '$timeout', '$websocket', '$stomp', 'userFactory', 'drinkFactory', 'orderFactory', 'wsFactory', controllerCompOrder],
    // declaramos un alias para no tener que usar $ctrl.
    controllerAs: 'compOrder'
  });

  function controllerCompOrder($state, $timeout, $websocket, $stomp, userFactory, drinkFactory, orderFactory, wsFactory) {

    var vm = this;
    vm.user = userFactory.logeduser;
    vm.wsmessage={};
    
    wsFactory.wsconnect();

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
        if (vm.kinds[i].iddrink === vm.kindSelect) {
          vm.order.idcustomer = vm.user.idcustomer;
          vm.order.iddrink = vm.kinds[i].iddrink;
          vm.order.priceorder = vm.kinds[i].pricedrink
          vm.selkind = vm.kinds[i].kind;
          break;
        }
      }//end for

      return vm.order;
    };

    vm.askOrder = function () {

      console.log('GGG asking order executing ', vm.order);
      orderFactory.saveOrder(vm.order).then(function (data) {
        var ordertosend = data.idorder;
        console.log('GGG data', data);
        wsFactory.sendOrder(ordertosend);
        console.log('GGG wsFactory.sendOrder(ordertosend)',ordertosend);
        wsFactory.wsonMessage(event);
        console.log('GGG wsFactory.wsonMessage(event)',event);
         vm.wsmessage=wsFactory.wsmessage;
      console.log('GGG vm.wsmessage',vm.wsmessage,'GGG wsFactory.wsmessage ',wsFactory.wsmessage);
      });
      //wsFactory.wsonMessage(event);
     
      
      vm.order = {};
      vm.kinds = null;
      vm.selkind = '';
      vm.kindSelect = '';
      vm.drinkSelect = '';
    }

  };

})(angular)