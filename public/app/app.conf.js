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

//  Controller for Login pages -- modify when its merged
(function() {
  'use strict';

  angular
    .module('xpresso.loginview')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('loginview', {
      url: '/loginview',
      views: {
        "main": {
          controller: 'LoginController',
          templateUrl: 'app/home/templates/loginview.tpl.html'
        }
      }
    });
  }
})();

//  Controller for Add Agenda pages -- modify when its merged

(function() {
  'use strict';

  angular
    .module('xpresso.loginview')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('loginview', {
      url: '/loginview',
      views: {
        "main": {
          controller: 'topicController',
          templateUrl: 'app/home/templates/loginview.tpl.html'
        }
      }
    });
  }
})();