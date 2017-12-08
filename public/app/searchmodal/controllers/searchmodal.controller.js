(function() {
  'use strict';

  angular
  .module('xpresso.searchmodal.controllers')
  .controller('SearchmodalController', SearchmodalController);
  SearchmodalController.$inject = ["SearchModal", '$uibModalInstance', 'result'];

// On Click "Login" function call
  function SearchmodalController(Login, $uibModalInstance, result) {
    var vm = this;
    vm.result = result;

    vm.ok = function () {
      $uibModalInstance.close();
    };
  }
})();
