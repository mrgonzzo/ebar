(function (angular) {

  angular.module('app').component('compOfice', {
    // otra opción es poner aquí directamente el html asignándoselo a template:
    templateUrl: 'app/components/ofice/ofice.html',
    // en controller definimos la función que escribimos abajo
    controller: [ '$timeout','$websocket','wsFactory', controllerCompOfice],
    // declaramos un alias para no tener que usar $ctrl.
    controllerAs: 'compOfice'
  });

  function controllerCompOfice( $timeout, $websocket, wsFactory) {
    var vm = this;
    vm.pedido={};
    
    var socket=wsFactory.ws;
    var stompClient = null;
    socket.onOpen();
    
     vm.connect  = function(){
      //var socket = new SockJS('ws://localhost:8080/kitchen');
       
      stompClient = Stomp.over(socket);
       stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/ordermessage/marchando', function (pedido) {
            vm.showPedido(JSON.parse(pedido.body).content);
            console.log('Connected: ' + frame);
        });
    });

  }
  
  vm.showPedido=function (pedido) {
    socket.onMessage(pedido);
    //$("#greetings").append("<tr><td>" + message + "</td></tr>");
    console.log('message ' + pedido);
    vm.pedido=pedido;
    return vm.pedido;
}

 
   };
})(angular)

/*

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}*/

/* 
function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.send("/app/hello", {}, JSON.stringify({'name': $("#name").val()}));
}

/*
$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});*/