(function() {
  'use strict';

  angular
    .module('xpresso.about.controllers')
    .controller('AboutController', AboutController);

  AboutController.$inject = [];

  function AboutController() {
    var vm = this;

    // This is simple a demo for UI Boostrap.
    vm.dropdownDemoItems = [
      "The first choice!",
      "And another choice for you.",
      "but wait! A third!"
    ];

  }
})();
