(function() {
  'use strict';

  angular
    .module('xpresso.login.services')
    .factory('login', Login);

  Login.$inject = ['$http', '$localstorage'];

  function Login($http, $localstorage) {
    var login = {};

    return login;
  }
})();
