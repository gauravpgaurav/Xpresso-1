(function() {
  'use strict';

  angular
    .module('xpresso.summary.services')
    .factory('Summary', Summary);

  Summary.$inject = ['$http'];

  function Summary($http) {
    var Summary = {};

    return Summary;
  }
})();
