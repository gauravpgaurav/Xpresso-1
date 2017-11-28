(function() {
  'use strict';

  angular
    .module('xpresso.about')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('about', {
      url: '/about',
      views: {
        "main": {
          controller: 'AboutController',
          templateUrl: 'app/about/templates/about.tpl.html'
        }
      }
    });
  }
})();
