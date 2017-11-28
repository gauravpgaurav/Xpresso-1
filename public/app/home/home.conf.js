(function() {
  'use strict';

  angular
    .module('xpresso.home')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('home', {
      url: '/home',
      views: {
        "main": {
          controller: 'HomeController',
          templateUrl: 'app/home/templates/home.tpl.html'
        }
      }
    });
  }
})();
