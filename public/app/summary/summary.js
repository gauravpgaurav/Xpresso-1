(function() {
  'use strict';

  angular
    .module('xpresso.summary', [
      'ui.router',
      'ui.bootstrap',
      'xpresso.summary.services',
      'xpresso.summary.controllers'
    ]);

  angular
    .module('xpresso.summary.services', []);

  angular
    .module('xpresso.summary.controllers', []);

})();
