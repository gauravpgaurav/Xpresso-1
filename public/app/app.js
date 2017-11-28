angular
  .module('xpresso', [
    'xpresso.routes',
    'xpresso.config',
    'xpresso.home',
    'xpresso.about'
  ]);

angular
  .module('xpresso.routes', ['ui.router']);

angular
  .module('xpresso.config', []);

angular
  .module('xpresso')
  .run(run);

function run() {
  console.log("Brewing Xpresso");
}