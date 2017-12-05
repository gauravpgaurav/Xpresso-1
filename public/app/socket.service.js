(function () {
  'use strict';
  
  angular
    .module('xpresso.services')
    .factory('SocketIO', SocketIO);

  SocketIO.$inject = ['$rootScope', 'socketFactory'];

  function SocketIO($rootScope, socketFactory) {
    var socket = io.connect('http://localhost:8080');
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {  
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    };
  }
})();