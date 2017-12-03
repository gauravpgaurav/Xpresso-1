(function() {
  'use strict';

  angular
  .module('xpresso.login.controllers')
  .controller('LoginController', LoginController);

  LoginController.$inject = [];


// On Click "Login" function call
  function LoginController() {
    var vm = this;
     //  $scope.master = {firstName:"John", lastName:"Doe"};
    vm.submit = function() {
    	var fname = vm.firstName;
    	var lname = vm.lastName;
   // 	%location.path('/addmeeting');
  //      $scope.user = angular.copy($scope.master);
    };
};
 
})();
