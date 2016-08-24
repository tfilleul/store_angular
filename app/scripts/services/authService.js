'use strict';

angular.module('store').service('authService', ['$rootScope', '$http', '$log', function($rootScope, $http, $log) {
      this.login = function (authentification) {
    	  $log.debug("Checking login/password : " + authentification.login + "/ <hidden pass>");
          return $http.put(CONSTANTES.APPLICATION_URL + '/store/mvc/logon', authentification);
      };
      
      this.logout = function () {
    	  $log.debug("Logout ");
          return $http.get(CONSTANTES.APPLICATION_URL + '/store/mvc/logoff');
      };
}]);

