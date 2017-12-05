(function() {
  'use strict';

  angular
  .module('xpresso.join.controllers')
  .controller('JoinController', JoinController);
  JoinController.$inject = ["Join"];

// On Click "Login" function call
  function JoinController(Join) {
    var vm = this;
     //  $scope.master = {firstName:"John", lastName:"Doe"};
    
    vm.join = join;

      function join(){
        Join.get(vm.meetingid).then(
        createJoinSuccessCallback,
        createJoinFailureCallback
      );

      function createJoinSuccessCallback(response) {
        console.log("Joined meeting successfully");
        }

      function createJoinFailureCallback(){
        console.log("Failed to Join meeting");
      }

      };
 
}
})();
