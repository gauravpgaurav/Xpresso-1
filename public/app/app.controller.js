(function() {
  'use strict';

  angular
  .module('xpresso.controllers')
  .controller('AppController', AppController);

  AppController.$inject = ['BaseAPI', '$state','$localStorage'];

  function AppController(BaseAPI, $state,$localStorage) {
    var vm = this;

    vm.data = {};
    vm.status = {};
    vm.status.progress = 5;
    vm.status.is_recording = false;
    vm.status.watson = {};
    vm.status.watson.stream = {};

    vm.data.undiscussed_topics = [];
    vm.data.discussed_topics = [];
    vm.data.meeting_time = Math.abs(meeting.end_time - meeting.start_time)/1000;
    vm.data.transcription = {};

    vm.clickRecord = clickRecord;
    vm.selectTopic = selectTopic;
    vm.getUpdatedTopics = getUpdatedTopics;
    vm.checkDiscussed = checkDiscussed;
    vm.finishTopic = finishTopic;
    vm.meetingId=$localStorage.meetingID;
    init();

    function init() {
      //start_watson();
      getUpdatedTopics();
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
          console.log('Data : ' + JSON.stringify(data));
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

    function getUpdatedTopics() {
      vm.meetingId=$localStorage.meetingID;
      BaseAPI.getUpdatedTopics(vm.meetingId).then(
        getUpdatedTopicsSuccessCallback,
        getUpdatedTopicsFailureCallback
      );

      function getUpdatedTopicsSuccessCallback(response) {
        console.log(response);
    //    var data = response.data;
        var topicArray = response.data[0].Topics;
        vm.data.undiscussed_topics = [];
        topicArray.forEach(function(topic){
          vm.data.undiscussed_topics.push(topic.Topic_Name);
        });
        console.log(vm.data.undiscussed_topics);
     //   vm.data.undiscussed_topics = data.undiscussed_topics;
     //   vm.data.discussed_topics = data.discussed_topics;
        }
      function getUpdatedTopicsFailureCallback() {
        console.log("Failed to load updated topics.");
      }
    }

    function checkDiscussed(topic) {
      return vm.data.discussed_topics.findIndex(function(elem) {
        return elem.id == topic.id;
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
      BaseAPI.getUpdatedTopics().then(
        getUpdatedTopicsSuccessCallback,
        getUpdatedTopicsFailureCallback
      );

      function getUpdatedTopicsSuccessCallback(response) {
        var data = response.data;
        vm.data.undiscussed_topics = data.undiscussed_topics;
        vm.data.discussed_topics = data.discussed_topics;

        vm.status.progress = vm.data.discussed_topics.length/(vm.data.discussed_topics.length + vm.data.undiscussed_topics.length) * 100;

        selectTopic(vm.data.undiscussed_topics[0]);
      }
      function getUpdatedTopicsFailureCallback() {
        console.log("Failed to load updated topics.");
      }
    }
  }
})();