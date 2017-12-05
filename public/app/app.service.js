(function () {
  'use strict';

  angular
    .module('xpresso.services')
    .factory('BaseAPI', BaseAPI);

  BaseAPI.$inject = ['$http', '$q'];

  function BaseAPI($http, $q) {
    var api = {
      getWatsonSTTToken: getWatsonSTTToken,
      getUpdatedTopics: getUpdatedTopics,
      sendTranscript: sendTranscript
    };

    return api;

    function getWatsonSTTToken() {
      return $http.get('/api/speech-to-text/token/');
    }

    function getUpdatedTopics(meetingId) {
      var param2 = {'_id': meetingId };
      return $http.get('/api/meeting/', {headers: {'query': JSON.stringify(param2)}});
    }

    function sendTranscript(data) {
      return $http.put('/api/meeting/insert/', data);
    }
  }
})();