(function() {
  'use strict';

  angular
    .module('xpresso.addJoinMeeting.services')
    .factory('addJoinMeeting', AddJoinMeeting);

  AddJoinMeeting.$inject = ['$http', '$localStorage'];

  function AddJoinMeeting($http, $localStorage) {
    var addJoinMeeting = {};

    return addJoinMeeting;
  }
})();
