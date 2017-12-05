(function() {
  'use strict';

  angular
    .module('xpresso.summary')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('summary', {
      url: '/summary',
      views: {
        "main": {
          controller: 'SummaryController',
          templateUrl: 'app/summary/templates/summary.tpl.html'
        }
      }
    });
  }
})();
