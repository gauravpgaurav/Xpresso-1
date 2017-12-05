(function() {
  'use strict';

  angular
    .module('xpresso.join.services')
    .factory('Join', Join);

  Login.$inject = ['$http'];

  function Join($http) {
    var join = {
    	get: get 
    };
    return join;
      
    function get(meetingid) {
        var param = {'_id':meetingid};
    	console.log(JSON.stringify(param));
        return $http.get('/api/meeting/',{headers:{'query': JSON.stringify(param)}});
    }
  }
})();
