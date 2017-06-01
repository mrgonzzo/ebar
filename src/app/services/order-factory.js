(function (angular) {
    angular.module('app').factory('orderFactory', ['$q', '$http', orderFactory]);
    function orderFactory($q, $http) {
        var module = {};
        var self = module;
        module.originalOrder = false;
        module.getOrderbyuser = function (usercod) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get('http://localhost:8080/edenbar/orders/' + usercod).then(function (response) {
                // Seteamos originalUser para que la próxima vez no sea necesaria la llamada ajax
                self.originalOrder = response.data;
                defered.resolve(self.originalOrder);
            });

            return promise;
        };

        module.saveOrder = function (order) {
            $http.post('http://localhost:8080/edenbar/orders/save', order)
        };

        return module;
    };
})(angular);
