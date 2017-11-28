(function () {
  'use strict';

  angular
    .module('xpresso.config')
    .config(config);

  config.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

  function config($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise( '/home' );
  }
})(); 