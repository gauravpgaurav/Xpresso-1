(function() {
  'use strict';

  angular
    .module('xpresso.idGeneration.services')
    .factory('IdGeneration', IdGeneration);

  IdGeneration.$inject = ['$http'];

  function IdGeneration($http) {
    var IdGeneration = {

    	get:get
    };

    return IdGeneration;
  	
  	



  }
})();
