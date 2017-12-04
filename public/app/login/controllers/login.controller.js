(function() {
  'use strict';

  angular
  .module('xpresso.login.controllers')
  .controller('LoginController', LoginController);
  LoginController.$inject = ["Login"];

// On Click "Login" function call
  function LoginController(Login) {
    var vm = this;
     //  $scope.master = {firstName:"John", lastName:"Doe"};
    
    vm.login = login;

      function login(){
        Login.get(vm.firstname, vm.lastname).then(
        createUserSuccessCallback,
        createUserFailureCallback
      );

      function createUserSuccessCallback(response) {
        console.log("Loged in successfully");
        }

      function createUserFailureCallback(){
        console.log("Failed to Login");
      }

      };
 
}
})();
