(function() {
  'use strict';

  angular
    .module('xpresso.login.services')
    .factory('Login', Login);

  Login.$inject = ['$http'];

  function Login($http) {
    var login = {
    	get: get
        
    };
    return login;
    
    function get(firstname,lastname) {
    	var param = {'firstName':firstname,'lastName':lastname};
    	console.log(JSON.stringify(param));
        return $http.get('/api/user/',{headers:{'query': JSON.stringify(param)}});
  
				}

}
})();
