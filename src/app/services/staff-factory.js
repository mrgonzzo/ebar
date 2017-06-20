(function (angular) {
    angular.module('app').factory('staffFactory', ['$q', '$http', staffFactory]);
    function staffFactory($q,$http) {
        var module = {};
        var self = module;
        module.logedstaff;
        module.originalstaff = false;
        module.getLogstaff = function (staffcod) {
             var defered = $q.defer();
            var promise = defered.promise;
            //http://192.168.1.41:8080/ebar/employe/
            $http.get('http://192.168.1.41:8080/ebar/customer/' + staffcod ).then(function (response) {
                    // Seteamos originalstaff para que la próxima vez no sea necesaria la llamada ajax
                    self.originalstaff = response.data;
                    defered.resolve(self.originalstaff);
                        });
            
            return promise;
        };
        return module;
    };
})(angular);
