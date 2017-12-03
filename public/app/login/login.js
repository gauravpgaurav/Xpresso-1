(function() {
  'use strict';

  angular
    .module('xpresso.login', [
      'ui.router',
      'ui.bootstrap',
      'xpresso.login.services',
      'xpresso.login.controllers'
    ]);

  angular
    .module('xpresso.login.services', []);

  angular
    .module('xpresso.login.controllers', []);

})();
