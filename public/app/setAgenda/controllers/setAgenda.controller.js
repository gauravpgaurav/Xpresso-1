(function() {
  'use strict';

  angular
  .module('xpresso.setAgenda.controllers')
  .controller('SetAgendaController', SetAgendaController);

  SetAgendaController.$inject = ["Agenda", '$localStorage'];

  function SetAgendaController(Agenda,$localStorage) {
    var vm = this;
    vm.topicList = [];
    vm.add = function () 
    {
        vm.topicList.push({todoText:vm.topics, done:false});
        vm.topics = "";
    };
  
    vm.remove = function() 
    {
        var oldList = vm.topicList;
        vm.topicList = [];
        angular.forEach(oldList, function(x) {
            if (!x.done) vm.topicList.push(x);
        });
    };

    vm.done=done;

    function done() {
      var topicListFormatted = [];
      for (var i = 0; i < vm.topicList.length; i++) {
        var obj = {};
        obj['Serial_No'] = i;
        obj['Topic_Name'] = vm.topicList[i].todoText;
        topicListFormatted.push(obj);
      } 

      console.log(topicListFormatted);

      Agenda.post(vm.startDate,vm.startTime,vm.endTime,topicListFormatted).then(
        createMeetingSuccessCallback,
        createMeetingFailureCallback
      );
    
      function createMeetingSuccessCallback(response) {
        $localStorage.meetingID = response.data._id
        console.log($localStorage.meetingID);
      }

      function createMeetingFailureCallback(){
        console.log("Failed to Login");
      }

    };

    }
})();
