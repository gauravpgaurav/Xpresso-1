(function () {
  'use strict';
  
  angular
    .module('xpresso.services')
    .factory('SocketIO', SocketIO);

  SocketIO.$inject = ['$rootScope', 'socketFactory'];

  function SocketIO($rootScope, socketFactory) {
    var pathArray = location.href.split( '/' );
    var protocol = pathArray[0];
    var host = pathArray[2];
    var url = protocol + '//' + host;
    var socket = io.connect(url);
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