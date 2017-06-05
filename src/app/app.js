'use strict';
(function (angular) {
  /* Declaramos el módulo */
  angular.module('app', ['ui.router','angular-websocket']);

  angular.module('app').config(['$stateProvider', '$urlRouterProvider', appConfig]);

  function appConfig($stateProvider, $urlRouterProvider) {
    var main = {
      name: 'main',
      url: '/main',
      template: '<comp-mainview></comp-mainview>'
    };
    var about = {
      name: 'aboutus',
      url: '/aboutus',
      template: '<comp-aboutus></comp-aboutus>'
    };
    var uslogon = {
      name: 'uslogon',
      url: '/uslogon',
      template: '<comp-uslogon></comp-uslogon>'
    };
    var stlogon = {
      name: 'stlogon',
      url: '/stlogon',
      template: '<comp-stlogon></comp-stlogon>'
    };
    var order = {
      name: 'order',
      url: '/order',
      template: '<comp-order></comp-order>'
    };
    var kitchen = {
      name: 'kitchen',
      url: '/kitchen',
      template: '<comp-kitchen></comp-kitchen>'
    };
    $stateProvider.state(main);
    $stateProvider.state(about);
    $stateProvider.state(uslogon);
    $stateProvider.state(stlogon);
    $stateProvider.state(order);
$stateProvider.state(kitchen);
    $urlRouterProvider.otherwise('/main');
  }
})(angular);