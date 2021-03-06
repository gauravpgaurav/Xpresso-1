(function() {
  'use strict';

  angular
    .module('xpresso.login')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('login', {
      url: '/login',
      views: {
        "main": {
          controller: 'LoginController as vm',
          templateUrl: 'app/login/templates/login.tpl.html'
        }
      }
    });
  }
})();
