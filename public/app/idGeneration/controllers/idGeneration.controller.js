(function() {
  'use strict';

  angular
    .module('xpresso.idGeneration.controllers')
    .controller('IdController', IdController);

  IdController.$inject = ['$uibModalInstance'];

  function IdController($uibModalInstance) {
    var vm = this;
    vm.later = false;

    vm.done = function() {
      $uibModalInstance.close();
    }
  }
})();