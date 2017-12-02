(function () {
  'use strict';

  angular
    .module('xpresso.services')
    .factory('BaseAPI', BaseAPI);

  BaseAPI.$inject = ['$http'];

  function BaseAPI($http) {
    var api = {
      getWatsonSTTToken: getWatsonSTTToken
    };

    return api;

    function getWatsonSTTToken() {
      return $http.get('/api/speech-to-text/token/');
    }
  }
})();