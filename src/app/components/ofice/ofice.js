(function (angular) {

    angular.module('app').component('compOfice', {
        // otra opción es poner aquí directamente el html asignándoselo a template:
        templateUrl: 'app/components/ofice/ofice.html',
        // en controller definimos la función que escribimos abajo
        controller: ['$interval', '$websocket', 'wsFactory', controllerCompOfice],
        // declaramos un alias para no tener que usar $ctrl.
        controllerAs: 'compOfice'
    });

    function controllerCompOfice($interval, $websocket, wsFactory) {
        var vm = this;
        vm.pedido;
        var data = 'CocinaOk';
        wsFactory.wsconnect();
        //wsFactory.wsonOpen(event)
        wsFactory.wsonMessage(event);
        vm.pedido=wsFactory.wsmessage;
        //wsFactory.wssendmessage(data);
     /*   $interval(function () {
        vm.pedido = wsFactory.wsmessage;
         console.log('vm.pedido ',vm.pedido);
      console.log('wsFactory.wsmessage ',wsFactory.wsmessage);
         }, 5000);*/
        

    };
})(angular)

