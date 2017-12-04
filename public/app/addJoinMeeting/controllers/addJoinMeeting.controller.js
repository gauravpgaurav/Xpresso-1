(function() {
  'use strict';

  angular
    .module('xpresso.addJoinMeeting.controllers')
    .controller('addjoinController', AddJoinController);

  AddJoinController.$inject = [];

  function AddJoinController() {
    var vm = this;

    vm.loadAddAgendaPage = function () 
            {
       // Redirect to set agenda page

    };

    vm.loadHomePage = function(){

    	///redirect to home page
    	
    };

    }
})();
