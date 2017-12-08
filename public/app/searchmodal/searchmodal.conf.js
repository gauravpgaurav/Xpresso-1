(function() {
  'use strict';

  angular
    .module('xpresso.searchmodal')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('searchmodal', {
      url: '/searchmodal',
      views: {
        "main": {
          controller: 'SearchModalController as vm',
          templateUrl: 'app/searchmodal/templates/searchmodal.tpl.html'
        }
      }
    });
  }
})();