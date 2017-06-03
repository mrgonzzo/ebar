(function (angular) {
    angular.module('app').factory('drinkFactory', ['$q', '$http', drinkFactory]);
    function drinkFactory($q, $http) {
        var module = {};
        var self = module;
        self.originalDrinks = false;
        self.originalKinds=false
        module.getDrink = function () {
            var defered = $q.defer();
            var promise = defered.promise;
            if (self.originalDrinks) {
                defered.resolve(self.originalDrinks);
            } else {
                // Si no, los cargamos con get y devolvemos el data del response
                $http.get('http://localhost:8080/ebar/drinks').then(function (response) {
                    // Seteamos originalDrinks para que la próxima vez no sea necesaria la llamada ajax
                    self.originalDrinks = response.data;
                    defered.resolve(self.originalDrinks);
                });
            }
            return promise;
        };
        module.getKindByDrink = function (sdrink) {
            var defered = $q.defer();
            var promise = defered.promise;
           
                // Si no, los cargamos con get y devolvemos el data del response
                $http.get('http://localhost:8080/ebar/drinks/kind/'+sdrink).then(function (response) {
                    // Seteamos originalKinds para que la próxima vez no sea necesaria la llamada ajax
                    self.originalKinds = response.data;
                    defered.resolve(self.originalKinds);
                });
           
            return promise;
        };
        return module;
    };
})(angular);
