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
            self.ws.onopen = onOpen;
            self.ws.onclose = onClose;
            self.ws.onmessage = onmessage;
            self.ws.onerror = onError;
        }//end wsconnect()
        
       module.wsonOpen= function(evt){
    //called as soon as a connection is opened
    self.cntmessage =  "CONNECTED TO SERVER";
  } // end onOpen
   module.wsonClose=function(evt){
    //called when connection is severed
    self.cntmessage = "DISCONNECTED";
  } // end onClose;
   module.wsonmessage=function(evt){
    //called on receipt of cntmessage
    self.wsmessage += "RESPONSE: " 
      + evt.data;
  } // end onmessage
   module.wsonError=function(evt){
    //called on error
    self.wsmessage += "ERROR: " 
      + evt.data ;
  } // end onError
   module.wssendmessage=function(txtMessage){
    //get cntmessage from text field
    ///txtcntmessage = "txtcntmessage";
    message = txtMessage.value;
    //pass cntmessage to server
    self.ws.send(message);
    self.wsmessage += "SENT: " + message;
  } // end sendcntmessage

    }
})(angular)