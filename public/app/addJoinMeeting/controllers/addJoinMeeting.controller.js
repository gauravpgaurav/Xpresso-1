(function() {
  'use strict';

  angular
    .module('xpresso.addJoinMeeting.controllers')
    .controller('addjoinController', AddJoinController);

  AddJoinController.$inject = ['$uibModalInstance'];

  function AddJoinController($uibModalInstance) {
    var vm = this;

    vm.loadPage = function (param) {
      $uibModalInstance.close(param);
    };

  }
})();
