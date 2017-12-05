(function() {
  'use strict';

  angular
    .module('xpresso.summary.controllers')
    .controller('SummaryController', SummaryController);

  SummaryController.$inject = ['Summary','$localStorage'];

  function SummaryController(Summary,$localStorage) {
    var vm = this;
    vm.discussedArray =[];
    vm.undiscussedArray =[];
    vm.meetingId=$localStorage.meetingID;
    init();

    function init(){
    	//Pick up discussed topics
    	getSummaryDiscussedTopics();
    	//Pick up undiscussed topics
        getSummaryUndiscussedTopics();
    }

    function getSummaryDiscussedTopics() {
      vm.meetingId=$localStorage.meetingID;
      Summary.get(vm.meetingId).then(
        getSummaryDiscussedTopicsSuccessCallback,
        getSummaryDiscussedTopicsFailureCallback
      );
    }


    function getSummaryDiscussedTopicsSuccessCallback(response) {
        console.log(response);
    //    var data = response.data;
        vm.discussedArray = response.data[0].Discussed_Topics;
        //vm.data.undiscussed_topics = [];
        //topicArray.forEach(function(topic){
        //  vm.data.undiscussed_topics.push(topic.Topic_Name);
        //});
        console.log(vm.discussedArray);
     //   vm.data.undiscussed_topics = data.undiscussed_topics;
     //   vm.data.discussed_topics = data.discussed_topics;
        }
    function getSummaryDiscussedTopicsFailureCallback() {
        console.log("Failed to load updated topics.");
    }

    function getSummaryUndiscussedTopics() {
      vm.meetingId=$localStorage.meetingID;
      Summary.get(vm.meetingId).then(
        getSummaryUndiscussedTopicsSuccessCallback,
        getSummaryUndiscussedTopicsFailureCallback
      );
    }



    function getSummaryUndiscussedTopicsSuccessCallback(response) {
        console.log(response);
        vm.undiscussedArray = response.data[0].Undiscussed_Topics;
        console.log(vm.undiscussedArray);
        }

    function getSummaryUndiscussedTopicsFailureCallback() {
        console.log("Failed to load updated topics.");
    }

  }
})();