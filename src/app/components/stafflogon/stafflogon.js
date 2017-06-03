(function (angular) {

    angular.module('app').component('compStlogon', {
        // otra opción es poner aquí directamente el html asignándoselo a template:
        templateUrl: 'app/components/stafflogon/stafflogon.html',
        // en controller definimos la función que escribimos abajo
        controller: ['$timeout', '$state', 'staffFactory', controllerCompStlogon],
        // declaramos un alias para no tener que Staffar $ctrl.
        controllerAs: 'compStlogon'
    });
    function controllerCompStlogon($timeout, $state, staffFactory) {
        var vm = this;
        goKitchen = function () {
            $state.go('kitchen');
        };
        vm.staffform = {};
        vm.message = '';
        //staff = staffFactory.getstaffByCod();
        vm.enterOffice = function () {
            var cod = vm.staffform.staffcod;
            console.log('cod', cod);
            if (!cod) {
                vm.message = 'Introduce tu codigo';
            } else {
                staffFactory.getLogstaff(cod).then(function (data) {
                    console.log('data[0]', data[0]);
                    var bdwaiter = data[0];
                    if (!bdwaiter) {
                        vm.message = 'Ese codigo no existe';
                        bdwaiter = null;
                    } else { // y
                      //  if (bdwaiter.organigrama) aqui la busqueda de empleo u paginacion dependiente en este 
                      //caso vamos directos a cocina para que el camamrero reciba el pedido
                        if (bdwaiter.keyword != vm.staffform.keyword) {
                            vm.message = 'Esa no es tu clave';
                        } else { // x
                            vm.message = 'Hola ' + bdwaiter.name + ' Pasa...';
                            staffFactory.logedstaff = bdwaiter;
                            console.log('staffFactory.logedstaff',staffFactory.logedstaff);
                            $timeout(goKitchen, 2000);
                        }//else x
                    };//else y
                });
            }

        }
    }
})(angular)