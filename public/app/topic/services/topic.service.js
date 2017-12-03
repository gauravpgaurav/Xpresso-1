(function() {
  'use strict';

  angular
    .module('xpresso.topic.services')
    .factory('Topic', Topic);

  Topic.$inject = ['$http'];

  function Topic($http) {
    var Topic = {
      finishTopic: finishTopic
    };

    return Topic;

    function finishTopic(topic) {
      // Manipulate localstorage to change topic from undiscussed to discussed
      discussed_topics.push(topic);
      undiscussed_topics = undiscussed_topics.filter(function(t) {
        return t.id !== topic.id;
      });
      // Update backend with the change
      return null;
    }
  }
})();
