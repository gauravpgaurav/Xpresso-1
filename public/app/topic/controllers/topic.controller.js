(function() {
  'use strict';

  angular
    .module('xpresso.topic.controllers')
    .controller('TopicController', TopicController);

  TopicController.$inject = ['$interval', '$scope', '$state', '$stateParams', 'Topic', '$localStorage'];

  function TopicController($interval, $scope, $state, $stateParams, Topic, $localStorage) {
    var vm = this;
    var i = 0, j = 1, k = 2, l = 3;
    var base = window.location.protocol
        + "//" + window.location.host
        + "/" + "public/common/searchframe?";
    var interval = 5000;
    var interval_instance = undefined;

    vm.topic = $stateParams.topic;
    vm.is_discussed = false;
    vm.meetingId = $localStorage.meetingID;

    vm.search_frames = {};
    vm.search_frames.frame1 = vm.search_frames.frame2 = base;
    vm.search_frames.frame3 = vm.search_frames.frame4 = base;

    /*var search_keywords = ["Machine Learning", "Artificial Intelligence", "Data Mining",
  "Algorithms", "HCI", "Computer Graphics", "Physics", "Quantum Computing", "Chemistry"];*/
    var search_keywords = [];

    vm.search_results = [];

    vm.finishTopic = finishTopic;
    vm.startInterval = startInterval;
    vm.stopInterval = stopInterval;
    vm.openSearch = openSearch;

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

    function openSearch(link) {
      $scope.$parent.app.openSearchPubModal(link);
    }

    function getSearchKeywords() {
      vm.meetingId = $localStorage.meetingID;
      Topic.getSearchKeywords(vm.meetingId).then(getKeywordsSuccess, getKeywordsFailure);

      function getKeywordsSuccess(response) {
        var search_keywords_data = response.data;
        function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
        }
        search_keywords = search_keywords_data.filter(onlyUnique);
        loadSearchResults(search_keywords);
      }
      function getKeywordsFailure() {
        console.log("Failed to retrieve keywords");
      }
    }

    function startInterval() {
      interval_instance = $interval(function() {
        refreshFrames();
        getSearchKeywords();
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
          var ifexist = false;
          for (var i = 0; i < vm.search_results.length; i++) {
            if (vm.search_results[i]['link'] == response.data['link']) {
              ifexist = true;
              break;
            }
          }
          if(!ifexist) {
            vm.search_results.push(response.data);
            refreshFrames();
          }
        }
        function getSearchResultsFailure() {
          console.log("Failed to retrieve results")
        }
      });
    }

    function finishTopic() {
    //  Topic.finishTopic(vm.topic);
      $scope.$parent.app.finishTopic(vm.topic);
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

    function searchResultModal() {
      var modalInstance = $uibModal.open({
        templateUrl: 'app/join/templates/join.tpl.html',
        controller: 'JoinController',
        controllerAs: 'vm',
        backdrop: 'static',
        keyboard: false
      });
      modalInstance.result.then(function (page) {
        console.log("Join meeting modal closed");
        if (page == 'back') {
          checkMeeting();
        } else {
          getUpdatedTopics();
        }
      }, function () {
        console.log("Join meeting Modal dismissed");
      });
    }

  }
})();


