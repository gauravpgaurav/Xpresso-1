
angular
  .module('xpresso', [
    'xpresso.routes',
    'xpresso.config',
    'xpresso.services',
    'xpresso.controllers',
    'xpresso.home',
    'xpresso.topic',
    'xpresso.about',
    'xpresso.login',
    'xpresso.setAgenda',
    'xpresso.addJoinMeeting',
    'xpresso.idGeneration',
    'xpresso.summary',
    'ui.bootstrap',
    'timer',
    '720kb.datepicker',
    'ngStorage'
  ]);

angular
  .module('xpresso.routes', ['ui.router']);

angular
  .module('xpresso.config', []);

angular
  .module('xpresso.services', []);

angular
  .module('xpresso.controllers', []);

angular
  .module('xpresso')
  .run(run);

function run() {
  console.log("Brewing Xpresso");
}

