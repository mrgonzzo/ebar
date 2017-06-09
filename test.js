<script language="javascript" type="text/javascript">
  var output;
  var websocket;
  function init(){
    output = document.getElementById("output")
  } // end init
  function connect(){
    //open socket
    if ("WebSocket" in window){
      websocket = new WebSocket('ws://echo.websocket.org/');
      //note this server does nothing but echo what was passed
      //use a more elaborate server for more interesting behavior
      output.innerHTML = "connecting..." ; //mv.message = "connecting..."
      //attach event handlers
      websocket.onopen = onOpen;
      websocket.onclose = onClose;
      websocket.onmessage = onMessage;
      websocket.onerror = onError;
    } else {
      alert("WebSockets not supported on your browser.");
    } // end if
  } // end connect
  function onOpen(evt){
    //called as soon as a connection is opened
    output.innerHTML = "<p>CONNECTED TO SERVER</p>";
  } // end onOpen
  function onClose(evt){
    //called when connection is severed
    output.innerHTML += "<p>DISCONNECTED</p>";
  } // end onClose;
  function onMessage(evt){
    //called on receipt of message
    output.innerHTML += "<p class = 'response'>RESPONSE: " 
      + evt.data + "</p>";
  } // end onMessage
  function onError(evt){
    //called on error
    output.innerHTML += "<p class = 'error'>ERROR: " 
      + evt.data + "</p>";
  } // end onError
  function sendMessage(){
    //get message from text field
    txtMessage = document.getElementById("txtMessage");
    message = txtMessage.value;
    //pass message to server
    websocket.send(message);
    output.innerHTML += "<p>MESSAGE SENT: " + message + "</p>";
  } // end sendMessage
  </script>