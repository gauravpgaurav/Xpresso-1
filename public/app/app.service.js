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
      sendTranscript: sendTranscript,
      putUpdates:putUpdates
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

    function putUpdates(meetingId,discussedArray,undiscussedArray){
      var param3 = {'_id':meetingId};
      var param4 = {'Discussed_Topics':discussedArray,'Undiscussed_Topics':undiscussedArray};
      return $http.put('/api/meeting/', {body: {'query': JSON.stringify(param3),'newData':JSON.stringify(param4)}});

    }


  }
})();