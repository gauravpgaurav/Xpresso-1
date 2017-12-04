(function() {
  'use strict';

  angular
    .module('xpresso.topic')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('topic', {
      url: '/topic',
      params: {
        topic: null
      },
      views: {
        "main": {
          controller: 'TopicController as vm',
          templateUrl: 'app/topic/templates/topic.tpl.html'
        }
      }
    });
  }
})();
