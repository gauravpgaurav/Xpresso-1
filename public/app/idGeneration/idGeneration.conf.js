(function() {
  'use strict';

  angular
    .module('xpresso.idGeneration')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('idGeneration', {
      url: '/idGeneration',
      views: {
        "main": {
          controller: 'IdController as vm',
          templateUrl: 'app/idGeneration/templates/idGeneration.tpl.html'
        }
      }
    });
  }
})();
