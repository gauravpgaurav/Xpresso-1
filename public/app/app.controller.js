(function() {
  'use strict';

  angular
  .module('xpresso.controllers')
  .controller('AppController', AppController);

  AppController.$inject = ['BaseAPI'];

  function AppController(BaseAPI) {
    var vm = this;

    vm.data = {};
    vm.status = {};
    vm.status.is_recording = false;
    vm.status.watson = {};
    vm.status.watson.stream = {};

    vm.data.undiscussed_topics = undiscussed_topics;
    vm.data.meeting_time = Math.abs(meeting.end_time - meeting.start_time)/1000;
    vm.data.transcription = {};

    vm.click_record = click_record;

    init();

    function init() {
      //start_watson();
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

    function click_record() {
      if (vm.status.is_recording == true) {
        vm.status.watson.stream.stop();
        vm.status.is_recording = false;
      } else {
        start_watson();
      }
    }
  }
})();