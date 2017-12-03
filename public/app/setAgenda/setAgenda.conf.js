(function() {
  'use strict';

  angular
    .module('xpresso.setAgenda')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('setAgenda', {
      url: '/setAgenda',
      views: {
        "main": {
          controller: 'setAgendaController as vm',
          templateUrl: 'app/setAgenda/templates/setAgenda.tpl.html'
        }
      }
    });
  }
})();
