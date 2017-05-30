(function (angular) {

    angular.module('app').component('compUslogon', {
        // otra opción es poner aquí directamente el html asignándoselo a template:
        templateUrl: 'app/components/userlogon/userlogon.html',
        // en controller definimos la función que escribimos abajo
        controller: ['$timeout', '$state', 'userFactory', controllerCompUslogon],
        // declaramos un alias para no tener que usar $ctrl.
        controllerAs: 'compUslogon'
    });
    function controllerCompUslogon($timeout, $state, userFactory) {
        var vm = this;
        goOrder = function () {
            $state.go('order');
        };
        vm.userform = {};
        vm.message = '';
        //user = userFactory.getUserByCod();
        vm.enterBar = function () {
            var cod = vm.userform.usercod;
            console.log('cod', cod);
            if (!cod) {
                vm.message = 'Introduce tu codigo';
            } else {
                userFactory.getLoguser(cod).then(function (data) {
                    console.log('data[0]', data[0]);
                    var bdcustomer = data[0];
                    if (!bdcustomer) {
                        vm.message = 'Ese codigo no existe';
                        bdcustomer = null;
                    } else {
                        if (bdcustomer.keyword != vm.userform.keyword) {
                            vm.message = 'Esa no es tu clave';
                        } else {
                            vm.message = 'Hola ' + bdcustomer.name + ' Pasa...';
                            $timeout(goOrder, 2000);
                        }
                    };
                });
            }

        }
    }
})(angular)