(function() {
  'use strict';

  angular
    .module('xpresso.join')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('join', {
      url: '/join',
      views: {
        "main": {
          controller: 'JoinController as vm',
          templateUrl: 'app/join/templates/join.tpl.html'
        }
      }
    });
  }
})();
