(function() {
  'use strict';

  angular
    .module('xpresso.topic.controllers')
    .controller('TopicController', TopicController);

  TopicController.$inject = ['$scope', '$state', '$stateParams', 'Topic'];

  function TopicController($scope, $state, $stateParams, Topic) {
    var vm = this;
    vm.topic = $stateParams.topic;
    vm.is_discussed = false;

    vm.finishTopic = finishTopic;

    init();

    function init() {

      if(vm.topic == null) {
        $state.go('home');
      } else {
        vm.is_discussed = ($scope.$parent.app.checkDiscussed(vm.topic)==-1)?false:true;
      }
    }

    function finishTopic() {
      Topic.finishTopic(vm.topic);
      $scope.$parent.app.finishTopic();
    }

  }
})();