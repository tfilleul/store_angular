angular.module('store').service('authService', ['$rootScope', '$http', '$log', function($rootScope, $http, $log) {
      this.login = function (credentials) {
    	  $log.debug("Checking login/password : " + credentials.login + "/ <hidden pass>");
          return $http.put(CONSTANTES.APPLICATION_URL + '/store_services/mvc/authUser', credentials);
      };
      
      this.logout = function (credentials) {
    	  $log.debug("Logout login : " + credentials.login);
          return $http.put(CONSTANTES.APPLICATION_URL + '/store_services/mvc/logout', credentials);
      };
}]);

