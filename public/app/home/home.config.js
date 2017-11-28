(function() {
  'user strict';

  angular
    .module('xpresso.home.config')
    .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
      $stateProvider.state( 'home', {
        url: '/home',
        views: {
          "main": {
            controller: 'HomeCtrl',
            templateUrl: 'app/home/home.tpl.html'
          }
        }
      });
    }
})();