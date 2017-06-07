'use strict';
(function (angular) {
  /* Declaramos el módulo */
  angular.module('app', ['ui.router', 'ngWebSocket']);

  angular.module('app').config(['$stateProvider', '$urlRouterProvider', appConfig]);

  function appConfig($stateProvider, $urlRouterProvider) {
    var ws = {
      
    }
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
    var ofice = {
      name: 'ofice',
      url: '/ofice',
      template: '<comp-ofice></comp-ofice>'
    };
    $stateProvider.state(main);
    $stateProvider.state(about);
    $stateProvider.state(uslogon);
    $stateProvider.state(stlogon);
    $stateProvider.state(order);
    $stateProvider.state(ofice);
    $urlRouterProvider.otherwise('/main');
  }
})(angular);