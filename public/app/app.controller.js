(function() {
  'use strict';

  angular
  .module('xpresso.controllers')
  .controller('AppController', AppController);

  AppController.$inject = ['BaseAPI', '$state', 'SocketIO', '$localStorage', '$uibModal'];

  function AppController(BaseAPI, $state, SocketIO, $localStorage, $uibModal) {
    var vm = this;

    vm.data = {};
    vm.status = {};
    vm.status.progress = 5;
    vm.status.is_recording = false;
    vm.status.watson = {};
    vm.status.watson.stream = {};

    vm.data.topicsArray=[];
    vm.data.undiscussed_topics = [];
    vm.data.discussed_topics = [];
    vm.data.meeting_time = Math.abs(meeting.end_time - meeting.start_time)/1000;
    vm.data.transcription = {};

    vm.clickRecord = clickRecord;
    vm.selectTopic = selectTopic;
    vm.getUpdatedTopics = getUpdatedTopics;
    vm.checkDiscussed = checkDiscussed;
    vm.finishTopic = finishTopic;
    vm.firstname = $localStorage.firstname;
    vm.meetingId = $localStorage.meetingID;
    init();

    function init() {
      //start_watson();
      checkLogin();
      getUpdatedTopics();
    }

    function checkLogin() {
      vm.firstname = $localStorage.firstname;
      if (!vm.firstname) {
        var modalInstance = $uibModal.open({
          templateUrl: 'app/login/templates/login.tpl.html',
          controller: 'LoginController',
          controllerAs: 'vm',
          backdrop: 'static'
        });
        modalInstance.result.then(function () {
          console.log("Login Modal closed");
          checkMeeting();
        }, function () {
          console.log("Login Modal dismissed");
        });
      } else {
        checkMeeting();
      }
    }

    function checkMeeting() {
      vm.meetingId = $localStorage.meetingID;

      if (!vm.meetingId) {
        var modalInstance = $uibModal.open({
          templateUrl: 'app/addJoinMeeting/templates/addJoinMeeting.tpl.html',
          controller: 'addjoinController',
          controllerAs: 'vm',
          backdrop: 'static',
          keyboard: false
        });
        modalInstance.result.then(function (page) {
          console.log("Add/join Modal closed");
          if(page == 'Create') {
            openSetAgendaModal();
          } else if (page == 'Join') {
            openJoinModal();
          }
        }, function () {
          console.log("Add/join Modal dismissed");
        });
      }
    }

    function openSetAgendaModal() {
      var modalInstance = $uibModal.open({
        templateUrl: 'app/setAgenda/templates/setAgenda.tpl.html',
        controller: 'SetAgendaController',
        controllerAs: 'vm',
        backdrop: 'static',
        keyboard: false
      });
      modalInstance.result.then(function (page) {
        console.log("Set agenda modal closed");
        openIdGenerationModal();
      }, function () {
        console.log("Set agenda Modal dismissed");
      });
    }
    function openIdGenerationModal() {
      var modalInstance = $uibModal.open({
        templateUrl: 'app/idGeneration/templates/idGeneration.tpl.html',
        controller: 'IdController',
        controllerAs: 'vm',
        backdrop: 'static',
        keyboard: false
      });
      modalInstance.result.then(function (page) {
        console.log("Id generation modal closed");
      }, function () {
        console.log("Id generation Modal dismissed");
      });
    }
    function openJoinModal() {
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
        }
      }, function () {
        console.log("Join meeting Modal dismissed");
      });
    }

    function start_watson() {
      BaseAPI.getWatsonSTTToken().then(
        getWatsonSTTTokenSuccessCallback,
        getWatsonSTTTokenFailureCallback
      );

      function getWatsonSTTTokenSuccessCallback(response) {
        var token = response.data;
        vm.status.watson.stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
          token: token,
          speaker_labels: true,
          objectMode: true,
          format: false
        });

        //vm.status.watson.stream.setEncoding('utf8');

        vm.status.watson.stream.on('data', function(data) {
          for (var i in data.results) {
              pushTranscription(data.results[i], data.result_index);
          }
        });

        vm.status.watson.stream.on('error', function(err) {
          console.log('Error : ' + JSON.stringify(err));
        });

        vm.status.is_recording = true;
      }

      function getWatsonSTTTokenFailureCallback(){
        console.log("Failed to get the Watson API token");
      }
    }

    function pushTranscription(result, index) {
      if(result['final'] == true) {
        var formatted_data = {};
        formatted_data['Result_Index'] = index;
        formatted_data['Text'] = result.alternatives[0].transcript;
        formatted_data['Timestamps'] = [];
        var min_ts = Number.MAX_SAFE_INTEGER, max_ts = -1;
        for (var i in result.alternatives[0].timestamps) {
          min_ts>result.alternatives[0].timestamps[i][1]?min_ts=result.alternatives[0].timestamps[i][1]:false;
          min_ts>result.alternatives[0].timestamps[i][2]?min_ts=result.alternatives[0].timestamps[i][2]:false;

          max_ts<result.alternatives[0].timestamps[i][1]?max_ts=result.alternatives[0].timestamps[i][1]:false;
          max_ts<result.alternatives[0].timestamps[i][2]?max_ts=result.alternatives[0].timestamps[i][2]:false;
        }
        formatted_data['Timestamps'][0] = min_ts;
        formatted_data['Timestamps'][1] = max_ts;

        var req_body = {};
        req_body.query = {};
        req_body.query['_id'] = vm.meetingId;
        req_body.newData = formatted_data;
        req_body.field = "Transcription"

        BaseAPI.sendTranscript(req_body).then(sendTrascriptSuccess, sendTrascriptFailure);

        function sendTrascriptSuccess(response) {
          console.log("Saved transcript");
        }
        function sendTrascriptFailure() {
          console.log("Save transcript failure");
        }
      }
    }

    function getUpdatedTopics() {
      vm.meetingId = $localStorage.meetingID;
      BaseAPI.getUpdatedTopics(vm.meetingId).then(
        getUpdatedTopicsSuccessCallback,
        getUpdatedTopicsFailureCallback
      );

      function getUpdatedTopicsSuccessCallback(response) {
        console.log(response);
        vm.data.topicsArray = response.data[0].Topics;
        var indexU=[];
        indexU = response.data[0].Undiscussed_Topics;
        for(var i=0;i<indexU.length;i++)
          {
            for(var j=0;j<response.data[0].Topics.length;j++)
            {
            if(indexU[i] == response.data[0].Topics[j].Serial_No)
            vm.data.undiscussed_topics.push(response.data[0].Topics[j].Topic_Name);
            }
          }
          var indexD=[];
        indexD = response.data[0].Discussed_Topics;
        for(var i=0;i<indexD.length;i++)
          {
            for(var j=0;j<response.data[0].Topics.length;j++)
            {
            if(indexD[i] == response.data[0].Topics[j].Serial_No)
            vm.data.discussed_topics.push(response.data[0].Topics[j].Topic_Name);
            }  
          }
        }
      function getUpdatedTopicsFailureCallback() {
        console.log("Failed to load updated topics.");
      }
    }

    function checkDiscussed(topic) {
      console.log("checkDiscussed");
      return vm.data.discussed_topics.findIndex(function(elem) {
        return elem == topic;
      });
    }

    function clickRecord() {
      if (vm.status.is_recording == true) {
        vm.status.watson.stream.stop();
        vm.status.is_recording = false;
      } else {
        start_watson();
      }
    }

    function selectTopic(topic) {
      $state.go('topic', {topic: topic});
    }

    function finishTopic() {

      vm.meetingId=$localStorage.meetingID;
      vm.data.discussed_topics.push(topic);
      vm.data.undiscussed_topics = vm.data.undiscussed_topics.filter(function(t) {
        return t !== topic;
      });

      var indexU=[];
        for(var i=0;i<vm.data.undiscussed_topics.length;i++)
          {
            for(var j=0;j<vm.data.topicsArray.length;j++)
            {
            if(vm.data.undiscussed_topics[i] == vm.data.topicsArray[j].Topic_Name)
              indexU.push(vm.data.topicsArray[j].Serial_No);
              
            }
          }  
          var indexD=[];
        for(var i=0;i<vm.data.discussed_topics.length;i++)
          {
            for(var j=0;j<vm.data.topicsArray.length;j++)
            {
            if(vm.data.discussed_topics[i] == vm.data.topicsArray[j].Topic_Name)
            indexD.push(vm.data.topicsArray[j].Serial_No);
            }
          }  

      SocketIO.emit('finish:topic', {
        undiscussed_topics: [],
        disscussed_topics: []
      }, function() {
        console.log("Callback");
        console.log("Update request successful");
        vm.status.progress = vm.data.discussed_topics.length/(vm.data.discussed_topics.length + vm.data.undiscussed_topics.length) * 100;

        selectTopic(vm.data.undiscussed_topics[0]);
      });

      SocketIO.on('update:meeting', function(data) {
        
      });
    }
  }
})();