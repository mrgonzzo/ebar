(function (angular) {
    angular.module('app').factory('drinkFactory', [drinkFactory]);
    function drinkFactory() {
        var module = {};
        var self = module;
        module.getDrink = function () {

            var defered = $q.defer();
            var promise = defered.promise;
            if (self.originalDrinks) {
                defered.resolve(self.originalDrinks);
            } else {
                // Si no, los cargamos con get y devolvemos el data del response
                $http.get('http://localhost:8080/edenbar/drinks').then(function (response) {
                    // Seteamos originalDrinks para que la próxima vez no sea necesaria la llamada ajax
                    self.originalDrinks = response.data;
                    defered.resolve(self.originalDrinks);
                });
            }
            return promise;
        };
        return module;
    };
})(angular);
