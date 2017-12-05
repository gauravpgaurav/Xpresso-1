(function() {
  'use strict';

  angular
    .module('xpresso.summary.services')
    .factory('Summary', Summary);

  Summary.$inject = ['$http'];

  function Summary($http) {
    var Summary = {
    	get: get        
    };
    return Summary;

    function get(meetingId) {
    var param2 = {'_id': 'OQ8SJ8'};
    //	var param2 = {'_id': meetingId};	OQ8SJ8
        return $http.get('/api/meeting/',{headers:{'query': JSON.stringify(param2)}});
	}
  }
})();
