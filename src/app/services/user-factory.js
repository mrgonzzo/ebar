(function (angular) {
    angular.module('app').factory('userFactory', ['$q', '$http', userFactory]);
    function userFactory($q,$http) {
        var module = {};
        var self = module;
        module.logeduser;
        module.originalUser = false;
        module.getLoguser = function (usercod) {
             var defered = $q.defer();
            var promise = defered.promise;
            $http.get('http://192.168.1.41:8080/ebar/customer/' + usercod ).then(function (response) {
                    // Seteamos originalUser para que la próxima vez no sea necesaria la llamada ajax
                    self.originalUser = response.data;
                    defered.resolve(self.originalUser);
                        });
            
            return promise;
        };
        return module;
    };
})(angular);
