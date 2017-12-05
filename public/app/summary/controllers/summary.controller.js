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
        var index=[];
        index = response.data[0].Discussed_Topics;
        console.log(index);
        for(var i=0;i<index.length;i++)
          {
            if(index[i] == response.data[0].Topics[i].Serial_No)
            vm.discussedArray.push(response.data[0].Topics[i].Topic_Name);
          }
        console.log(vm.discussedArray);
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
        var index=[];
        index = response.data[0].Undiscussed_Topics;
        console.log(index);
        //index.forEach(indices)
          for(var i=0;i<index.length;i++)
          {
            if(index[i] == response.data[0].Topics[i].Serial_No)
            vm.undiscussedArray.push(response.data[0].Topics[i].Topic_Name);
          }
        console.log(vm.undiscussedArray);
        }

    function getSummaryUndiscussedTopicsFailureCallback() {
        console.log("Failed to load updated topics.");
    }

  }
})();