'use strict';
(function (angular) {
  /* Declaramos el módulo */
  angular.module('app', ['ui.router']);

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
    var logon = {
      name: 'logon',
      url: '/logon',
      template: '<comp-uslogon></comp-uslogon>'
    };
    var order = {
      name: 'order',
      url: '/order',
      template: '<comp-order></comp-order>'
    };
    
    $stateProvider.state(main);
    $stateProvider.state(about);
    $stateProvider.state(logon);
    $stateProvider.state(order);
    $urlRouterProvider.otherwise('/main');
  }
})(angular);