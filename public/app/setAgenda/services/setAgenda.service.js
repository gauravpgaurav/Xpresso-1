(function() {
  'use strict';

  angular
    .module('xpresso.setAgenda.services')
    .factory('SetAgenda', Agenda);

  Agenda.$inject = ['$http', '$localstorage'];

  function Agenda($http, $localstorage) {
    var agenda = {};

    return agenda;
  }
})();
