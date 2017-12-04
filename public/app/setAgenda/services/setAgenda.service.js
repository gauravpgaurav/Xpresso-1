(function() {
  'use strict';

  angular
    .module('xpresso.setAgenda.services')
    .factory('Agenda', Agenda);

  Agenda.$inject = ['$http'];

  function Agenda($http) {
    var Agenda = {
    	post:post
    };

    return Agenda;

    function post(startDate,startTime,endTime,topicListFormatted) {

        var param1 = {'Date':startDate,'Start_time':startTime,'End_time':endTime,'Topics':topicListFormatted};
        console.log(param1);
        return $http.post('/api/meeting/',param1);
  }
}
})();

