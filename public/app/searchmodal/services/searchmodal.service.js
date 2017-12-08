(function() {
  'use strict';

  angular
    .module('xpresso.searchmodal.services')
    .factory('SearchModal', SearchModal);

  SearchModal.$inject = ['$http'];

  function SearchModal($http) {
    var searchmodal = {
      get: get
        
    };
    return searchmodal;
    
    function get(firstname,lastname) {
      var param = {'firstName':firstname,'lastName':lastname};
      console.log(JSON.stringify(param));
        return $http.get('/api/user/',{headers:{'query': JSON.stringify(param)}});
  
        }

}
})();
