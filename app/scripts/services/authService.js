'use strict';

angular.module('store').service('authService', ['$rootScope', '$http', '$log', function($rootScope, $http, $log) {
      this.login = function (criteria) {
    	  $log.debug("Checking login/password : " + criteria + "/ <hidden pass>");
          return $http.post('http://mywildfly:8080' + '/store/mvc/logon',criteria)
          .then(function(response) {
              return response;
          }, function(error) {
              return error;
          });
      };
      
      this.logout = function () {
    	  $log.debug("Logout ");
          return $http.get($rootScope.config.APPLICATION_URL + '/store/mvc/logoff');
      };
}]);

