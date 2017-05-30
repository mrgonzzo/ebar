(function (angular) {
    angular.module('app').factory('userFactory', ['$q', '$http', userFactory]);
    function userFactory($q,$http) {
        var module = {};
        var self = module;
        var user={};
        module.originalUser = false;
        module.getUser = function (usercod) {
            
            // Declaramos la promesa 
           var defered = $q.defer();
            var promise = defered.promise;
            //  Si ya tenemos la baraja, las devolvemos 
            if (self.originalUser) {
                defered.resolve(self.originalUser);
            } else {
                // Si no, los cargamos con get y devolvemos el data del response
                $http.get('http://localhost:8080/edenbar/customer/' + usercod ).then(function (response) {
                    // Seteamos originalUser para que la próxima vez no sea necesaria la llamada ajax
                    self.originalUser = response.data;
                    defered.resolve(self.originalUser);
                });
            }
            return promise;
        };
        module.getLoguser = function (usercod) {
             var defered = $q.defer();
            var promise = defered.promise;
            $http.get('http://localhost:8080/edenbar/customer/' + usercod ).then(function (response) {
                    // Seteamos originalUser para que la próxima vez no sea necesaria la llamada ajax
                    self.originalUser = response.data;
                    defered.resolve(self.originalUser);
                        });
            
            return promise;
        };
        return module;
    };
})(angular);
