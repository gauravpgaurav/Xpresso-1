(function() {
  'use strict';

  angular
  .module('xpresso.join.controllers')
  .controller('JoinController', JoinController);
  JoinController.$inject = ["Join", '$localStorage', '$uibModalInstance'];

// On Click "Login" function call
  function JoinController(Join, $localStorage, $uibModalInstance) {
    var vm = this;
    
    vm.join = join;
    vm.back = back;

    function join() {
        Join.get(vm.meetingid).then(
        createJoinSuccessCallback,
        createJoinFailureCallback
      );

      function createJoinSuccessCallback(response) {
        console.log("Joined meeting successfully");
        $localStorage.meetingID = vm.meetingid;
        $uibModalInstance.close('join');
      }

      function createJoinFailureCallback() {
        console.log("Failed to Join meeting");
      }

    };
    function back() {
      $uibModalInstance.close('back');
    }
 
}
})();
