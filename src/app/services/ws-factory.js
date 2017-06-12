(function (angular) {
    angular.module('app').factory('wsFactory', ['$q', '$http', '$websocket', wsFactory]);
   
    function wsFactory($q, $http, $websocket) {

        var module = {};
        var self = module;
        var stompClient = null;
        module.cntcntmessage='';
        module.wsmessage='';
        var websocket;
        module.ws = new WebSocket('ws://localhost:8080/kitchen');
        module.wsconnect = function () {
            ;
            self.cntmessage = "connecting..."
            self.ws.onopen = self.wsonOpen;
            self.ws.onclose = self.wsonClose;
            self.ws.onmessage = self.wsonMessage;
            self.ws.onerror = self.wsonError;
            console.log('wsconnect', self.cntmessage)
            var socket = self.ws;
            stompClient = Stomp.over(socket);
            stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/ordermessage/marchando', function (wsorder) {
            showGreeting(JSON.parse(wsorder.body).content);
        });
    });
        }//end wsconnect()
        module.sendOrder=function (order) {
    stompClient.send("/wsebar/pedir", {}, JSON.stringify(order));
}

module.showOrder=function (message) {
    self.wsmessage= message ;
}
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
