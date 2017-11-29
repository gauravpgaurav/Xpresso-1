(function() {
  'use strict';

  angular
  .module('xpresso.controllers')
  .controller('AppController', AppController);

  AppController.$inject = [];

  function AppController() {
    var vm = this;

    vm.data = {};

    vm.data.undiscussed_topics = undiscussed_topics;
    vm.data.meeting_time = Math.abs(meeting.end_time - meeting.start_time)/1000;
  }
})();