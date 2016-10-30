'use strict';

angular.module('store').service('authService', ['$rootScope', '$http', '$log', function($rootScope, $http, $log) {
      this.login = function (authentification) {
    	  $log.debug("Checking login/password : " + authentification.login + "/ <hidden pass>");
          return $http.put($rootScope.config.APPLICATION_URL + '/store/mvc/logon', authentification);
      };
      
      this.logout = function () {
    	  $log.debug("Logout ");
    	  var config = {withCredentials: true};
          return $http.get($rootScope.config.APPLICATION_URL + '/store/mvc/logoff');
      };
}]);

