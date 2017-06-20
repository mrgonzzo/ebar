//TODO: make this a module

/**
 * # SockJS socket management service
 * 
 * Creates SockJS socket connection to server, re-connects on disconnection, and
 * exports hooks to map handlers for various data interactions.
 * 
 */
(function (angular) {
	angular.module('app').factory('wsFactory',
		['$q', '$http', '$timeout', '$websocket', wsFactory]);

	function wsFactory($q, $http, $timeout, $websocket) {

		var module = {};
		var self = module;
		var stompClient = null;
		module.cntcntmessage = '';
		module.wsmessage = '';
		var websocket;

		module.wsconnect = function (order) {
			//module.ws = new WebSocket('ws://192.168.1.41:8080/kitchen');
			self.cntmessage = "connecting...";
			/*
			 * self.ws.onopen = self.wsonOpen; self.ws.onclose = self.wsonClose;
			 * self.ws.onmessage = self.wsonMessage; self.ws.onerror =
			 * self.wsonError;
			 */
			console.log('GGG wsconnect', self.cntmessage);
			var socket = new WebSocket('ws://192.168.1.41:8080/kitchen');
			stompClient = Stomp.over(socket);
			stompClient.connect({}, function (frame) {
				console.log('GGG Connected: ' + frame);
				stompClient.subscribe('/ordermessage/marchando', function (wsorder) {
					console.log('GGG stompClient.subscribe', wsorder);
					self.wsonOpen(event);
					console.log('GGG self..wsonOpen(event);', event);
					console.log('GGG wsorder ',wsorder);
					//self.wsmessage = JSON.stringify(wsorder.body);
					self.showOrder(JSON.parse(wsorder.body));
					console.log('GGG JSON.parse(wsorder.body).content: ',JSON.parse(wsorder.body));
					//	self.wsonOpen(message);
				});
			});
			console.log('GGG end wsconnect() ');
		}// end wsconnect()

		module.sendOrder = function (order) {
			stompClient.send("/wsebar/pedir", {}, JSON.stringify(order));
			console.log('GGG stompClient.send', JSON.stringify(order));
		}

		module.showOrder = function (message) {
			self.wsmessage = message;
			console.log('GGG self.wsmessage ',self.wsmessage);
		}
		module.wsonOpen = function (event) {
			// called as soon as a connection is opened
			console.log('GGG wsonOpen event ', event)
			self.cntmessage = "CONECTADO AL SERVIDOR";
			self.showOrder(event.content);
			console.log('GGG self.showOrder');
			//self.showOrder(message);
		} // end onOpen
		module.wsonMessage = function (event) { //called on receipt of cntmessage 
			//self.wsmessage += " RESPUESTA: " + event.currentTarget.response;
			 console.log('GGG wsonMessage self.wsmessage ', self.wsmessage); 
			 console.log('GGG wsonMessage currentTarget', event.currentTarget.response);
			  console.log('GGG wsonMessage event.data', event.data); 
               
			 //self.showOrder(event.currentTarget.response);
		}
		/*
		 * module.wsonClose = function (event) { //called when connection is
		 * severed self.cntmessage = "DISCONNECTED"; } // end onClose;
		  module.wsonMessage = function (event) { //called on receipt of
		 * cntmessage self.wsmessage += " RESPUESTA: " +
		 * event.currentTarget.response; console.log('GGG wsonMessage self.wsmessage ',
		 * self.wsmessage); console.log('GGG wsonMessage currentTarget',
		 * event.currentTarget.response); self.showOrder(event); } // end
		 * onmessage module.wsonError = function (event) { //called on error
		 * self.wsmessage += "ERROR: " + event.currentTarget.response; } // end
		 * onError module.wssendmessage = function (txtMessage) { //get
		 * cntmessage from text field ///txtcntmessage = "txtcntmessage";
		 * //message = txtMessage.value; //pass cntmessage to server
		 * self.ws.send(txtMessage); console.log('GGG wssendmessage txtMessage ',
		 * txtMessage) self.wsmessage += "SENT: " + txtMessage; } // end
		 * sendcntmessage
		 */
		return module;
	}
})(angular)
