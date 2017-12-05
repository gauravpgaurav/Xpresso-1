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

    function getUpdatedTopics(meetingId) {
        var param2 = {'_id': meetingId};
        return $http.get('/api/meeting/',{headers:{'query': JSON.stringify(param2)}});
        
  /*    var deferred = $q.defer();
      setTimeout(function() {
        var response = {};
        response.data = {};
        response.data.undiscussed_topics = undiscussed_topics;
        response.data.discussed_topics = discussed_topics;
        deferred.resolve(response);
      }, 100); */
      return deferred.promise;
    }
  }
})();