(function (angular) {
    angular.module('app').factory('orderFactory', ['$q', '$http', orderFactory]);
    function orderFactory($q, $http) {
        var module = {};
        var self = module;
        module.originalOrder = false;
        module.getOrderbyuser = function (usercod) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get('http://192.168.1.41:8080/ebar/orders/' + usercod).then(function (response) {
                // Seteamos originalUser para que la próxima vez no sea necesaria la llamada ajax
                self.originalOrder = response.data;
                defered.resolve(self.originalOrder);
            });

            return promise;
        };
        module.getOrderbyid = function (orcod) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get('http://192.168.1.41:8080/ebar/orders/' + orcod).then(function (response) {
                // Seteamos originalUser para que la próxima vez no sea necesaria la llamada ajax
                self.originalOrder = response.data;
                defered.resolve(self.originalOrder);
            });

            return promise;
        };
        module.saveOrder = function (order) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.post('http://192.168.1.41:8080/ebar/orders/save', order).then(function(response){
                self.originalOrder= response.data;
                defered.resolve(self.originalOrder);
            });

            return promise;
        };

        return module;
    };
})(angular);
