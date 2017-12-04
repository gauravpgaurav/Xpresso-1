(function() {
  'use strict';

  angular
    .module('xpresso.topic.controllers')
    .controller('TopicController', TopicController);

  TopicController.$inject = ['$interval', '$scope', '$state', '$stateParams', 'Topic'];

  function TopicController($interval, $scope, $state, $stateParams, Topic) {
    var vm = this;
    var i = 0, j = 1, k = 2, l = 3;
    var base = window.location.protocol
        + "//" + window.location.host
        + "/" + "public/common/searchframe?";
    var interval = 3000;
    var interval_instance = undefined;

    vm.topic = $stateParams.topic;
    vm.is_discussed = false;

    vm.search_frames = {};
    vm.search_frames.frame1 = vm.search_frames.frame2 = base;
    vm.search_frames.frame3 = vm.search_frames.frame4 = base;

    var search_keywords = ["Machine Learning", "Artificial Intelligence", "Data Mining",
  "Algorithms", "HCI", "Computer Graphics", "Physics", "Quantum Computing", "Chemistry"];

    vm.search_results = [];

    vm.finishTopic = finishTopic;
    vm.startInterval = startInterval;
    vm.stopInterval = stopInterval;

    init();

    function init() {

      if(vm.topic == null) {
        $state.go('home');
      } else {
        vm.is_discussed = ($scope.$parent.app.checkDiscussed(vm.topic)==-1)?false:true;
      }

      startInterval();

      loadSearchResults(search_keywords);
    }

    function startInterval() {
      interval_instance = $interval(function() {
        refreshFrames();
      }, interval);
    }
    function stopInterval() {
      if (angular.isDefined(interval_instance)) {
        $interval.cancel(interval_instance);
        interval_instance = undefined;
      }
    };
    $scope.$on('$destroy', function() {
      // Make sure that the interval is destroyed too
      stopInterval();
    });

    function loadSearchResults(keywords) {
      keywords.forEach(function(keyword) {
        Topic.getSearchResult(keyword).then(getSearchResultsSuccess, getSearchResultsFailure);

        function getSearchResultsSuccess(response) {
          vm.search_results.push(response.data);
        }
        function getSearchResultsFailure() {
          console.log("Failed to retrieve results")
        }
      });
    }

    function finishTopic() {
      Topic.finishTopic(vm.topic);
      $scope.$parent.app.finishTopic();
    }

    function refreshFrames(){
      if(i < vm.search_results.length) {
        vm.search_frames.frame1 = createSearchFrameURL(vm.search_results[i].title, vm.search_results[i].link, vm.search_results[i].desc);
        i=i+4;
      } else {
        i=0;
      }
      if(j < vm.search_results.length) {
        vm.search_frames.frame2 = createSearchFrameURL(vm.search_results[j].title, vm.search_results[j].link, vm.search_results[j].desc);
        j=j+4;
      } else {
        j=1;
      }
      if(k < vm.search_results.length) {
        vm.search_frames.frame3 = createSearchFrameURL(vm.search_results[k].title, vm.search_results[k].link, vm.search_results[k].desc);
        k=k+4;
      } else {
        k=2;
      }
      if(l < vm.search_results.length) {
        vm.search_frames.frame4 = createSearchFrameURL(vm.search_results[l].title, vm.search_results[l].link, vm.search_results[l].desc);
        l=l+4;
      } else {
        l=3;
      }
    }

    function createSearchFrameURL(title, link, desc) {
      return (base
        + "q=" + encodeURIComponent(title)
        + "&link=" + encodeURIComponent(link)
        + "&desc=" + encodeURIComponent(desc));
    }
  }
})();


