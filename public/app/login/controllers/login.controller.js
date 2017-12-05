(function() {
  'use strict';

  angular
  .module('xpresso.login.controllers')
  .controller('LoginController', LoginController);
  LoginController.$inject = ["Login", '$localStorage', '$uibModalInstance'];

// On Click "Login" function call
  function LoginController(Login, $localStorage, $uibModalInstance) {
    var vm = this;
    
    vm.login = login;

      function login(){
        Login.get(vm.firstname, vm.lastname).then(
        createUserSuccessCallback,
        createUserFailureCallback
      );

      function createUserSuccessCallback(response) {
        $localStorage.firstname = vm.firstname;
        $localStorage.lastname = vm.lastname;
        console.log("Loged in successfully");
        vm.ok();
      }

      function createUserFailureCallback(){
        console.log("Failed to Login");
      }

    };

    vm.ok = function () {
      $uibModalInstance.close();
    };
  }
})();
