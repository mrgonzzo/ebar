(function (angular) {
    angular.module('app').factory('wsFactory', ['$q', '$http', wsFactory]);
    function wsFactory($q, $http) {
        var module = {};
        var self = module;
        var callbacks = {};
        var currentCallbackId = 0;
        module.ws = new WebSocket('ws://localhost:8080/kitchen');
        module.messageObj = {};
        var getCallbackId = function () {
            currentCallbackId += 1;
            if (currentCallbackId > 10000) {
                currentCallbackId = 0;
            }
            return currentCallbackId;
        };
        var wslistener = function (data) {
            var messageObj = data;
            console.log("Received data from websocket: ", messageObj);
            // If an object exists with callback_id in our callbacks object, resolve it
            if (callbacks.hasOwnProperty(messageObj.callback_id)) {
                console.log(callbacks[messageObj.callback_id]);
                $rootScope.$apply(callbacks[messageObj.callback_id].cb.resolve(messageObj.data));
                delete callbacks[messageObj.callbackID];
            }
        };

        self.ws.onOpen = function (ordid) {
            console.log("Socket has been opened!");
            self.getOrders(ordid);
        };

        module.ws.onMessage = function (message) {
            wslistener(JSON.parse(message.data));
        };

        module.ws.sendRequest = function (request) {
            var defer = $q.defer();
            var callbackId = getCallbackId();
            callbacks[callbackId] = {
                time: new Date(),
                cb: defer
            };
            request.callback_id = callbackId;
            console.log('Sending request', request);
            module.ws.send(JSON.stringify(request));
            return defer.promise;
        };
        // Define a "getter" for getting customer data
        module.getOrders = function (idord) {
            var request = {
                type: "get_orders",
                value: idord
            }
            // Storing in a variable for clarity on what sendRequest returns
            var promise = self.ws.sendRequest(request);
            return promise;
        };
        return module;
    };
})(angular);