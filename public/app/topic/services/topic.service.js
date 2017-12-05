(function() {
  'use strict';

  angular
    .module('xpresso.topic.services')
    .factory('Topic', Topic);

  Topic.$inject = ['$http'];

  function Topic($http) {
    var Topic = {
      finishTopic: finishTopic,
      getSearchKeywords: getSearchKeywords,
      getSearchResult: getSearchResult,
    };

    return Topic;

    function finishTopic(topic) {
      // Manipulate localstorage to change topic from undiscussed to discussed
      discussed_topics.push(topic);
      undiscussed_topics = undiscussed_topics.filter(function(t) {
        return t.id !== topic.id;
      });
      // Update backend with the change
      console.log("Finish under topic");
      return null;
    }

    function getSearchKeywords(meetingId) {
      var param = {'_id': meetingId};
      return $http.get('/api/meeting/keywords', {headers:{'query': JSON.stringify(param)}});
    }

    function getSearchResult(keyword) {
      return $http.get('/api/search?q=' + keyword);
    }
  }
})();