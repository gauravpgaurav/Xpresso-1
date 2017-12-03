(function () {
  'use strict';

  angular
    .module('xpresso.services')
    .factory('BaseAPI', BaseAPI);

  BaseAPI.$inject = ['$http', '$q'];

  function BaseAPI($http, $q) {
    var api = {
      getWatsonSTTToken: getWatsonSTTToken,
      getUpdatedTopics: getUpdatedTopics
    };

    return api;

    function getWatsonSTTToken() {
      return $http.get('/api/speech-to-text/token/');
    }

    function getUpdatedTopics() {
      var deferred = $q.defer();
      setTimeout(function() {
        var response = {};
        response.data = {};
        response.data.undiscussed_topics = undiscussed_topics;
        response.data.discussed_topics = discussed_topics;
        deferred.resolve(response);
      }, 100);
      return deferred.promise;
    }
  }
})();