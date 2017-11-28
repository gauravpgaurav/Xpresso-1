(function() {
  'use strict';

  angular
    .module('xpresso.home.services')
    .factory('Home', Home);

  Home.$inject = ['$http', '$localstorage'];

  function Home($http, $localstorage) {
    var Home = {};

    return Home;
  }
})();
