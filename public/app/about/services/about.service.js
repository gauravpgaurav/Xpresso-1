(function() {
  'use strict';

  angular
    .module('xpresso.about.services')
    .factory('About', About);

  About.$inject = ['$http', '$localStorage'];

  function About($http, $localStorage) {
    var About = {};

    return About;
  }
})();
