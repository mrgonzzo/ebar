(function (angular) {
    angular.module('app').factory('wsFactory', ['$q', '$http', '$websocket', wsFactory]);
   
    function wsFactory($q, $http, $websocket) {

        var module = {};
        var self = module;
        module.cntcntmessage='';
        module.wsmessage='';
        var websocket;
        module.ws = new WebSocket('ws://localhost:8080/kitchen');
        module.wsconnect = function () {
            self.ws;
            self.cntmessage = "connecting..."
            self.ws.onopen = self.wsonOpen;
            self.ws.onclose = self.wsonClose;
            self.ws.onmessage = self.wsonMessage;
            self.ws.onerror = self.wsonError;
            console.log('wsconnect', self.cntmessage)
        }//end wsconnect()
        
       module.wsonOpen= function(event){
    //called as soon as a connection is opened
    console.log('wsonOpen event ',event)
    self.cntmessage =  "CONNECTED TO SERVER";
  } // end onOpen
   module.wsonClose=function(event){
    //called when connection is severed
    self.cntmessage = "DISCONNECTED";
  } // end onClose;
   module.wsonMessage=function(event){
    //called on receipt of cntmessage
    self.wsmessage += " RESPONSE: " 
      + event.currentTarget.response;
      console.log('wsonMessage self.wsmessage ',self.wsmessage);
       console.log('wsonMessage currentTarget',event.currentTarget.response);
  } // end onmessage
   module.wsonError=function(event){
    //called on error
    self.wsmessage += "ERROR: " 
      + event.currentTarget.response ;
  } // end onError
   module.wssendmessage=function(txtMessage){
    //get cntmessage from text field
    ///txtcntmessage = "txtcntmessage";
    //message = txtMessage.value;
    //pass cntmessage to server
    self.ws.send(txtMessage);
     console.log('wssendmessage txtMessage ',txtMessage)
    self.wsmessage += "SENT: " + txtMessage;
  } // end sendcntmessage
return module;
    }
})(angular)

/*(function (angular) {
    angular.module('app').factory('wsFactory', ['$q', '$http','$websocket', wsFactory]);
    function wsFactory($q, $http,$websocket) {
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

        self.ws.onOpen = function () {
            console.log("Socket has been opened!");
            
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
            console.log('getOrders',request);
            return promise;
        };
        return module;
    };
})(angular);
*/