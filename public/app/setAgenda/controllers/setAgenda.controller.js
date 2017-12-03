(function() {
  'use strict';

  angular
  .module('xpresso.setAgenda.controllers')
  .controller('setAgendaController', SetAgendaController);

  SetAgendaController.$inject = [];

  function SetAgendaController() {
    var vm = this;
    vm.topicList = [];
    vm.add = function () 
            {
        vm.topicList.push({todoText:vm.topics, done:false});
        vm.topics = "";
    };
  
  vm.remove = function() {
        var oldList = vm.topicList;
        vm.topicList = [];
        angular.forEach(oldList, function(x) {
            if (!x.done) vm.topicList.push(x);
        });
  };
}
})();

