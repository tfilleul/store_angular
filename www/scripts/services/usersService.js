angular.module('store').service('usersService', ['$rootScope', '$http', '$log', function($rootScope, $http, $log) {
	$log.debug("Call service users");
      
	this.getUsers = function (id) {    	 
          return $http.get(CONSTANTES.APPLICATION_URL+'/store_services/mvc/getUser?id='+id);
      };
      
     this.getAllUsers = function (id) {    	 
          return $http.get(CONSTANTES.APPLICATION_URL+'/store_services/mvc/getAllUser');
      };  
      
    this.getUsersByCritera = function (critere) {    	 
          return $http.post(CONSTANTES.APPLICATION_URL + '/store_services/mvc/getUserByCriteria',critere);
    };  
      
    this.addUser = function (user) {    	  
          return $http.post(CONSTANTES.APPLICATION_URL + '/store_services/mvc/addUser',user);
      };
     
     this.putUser = function (user) {    	  
          return $http.put(CONSTANTES.APPLICATION_URL +'/store_services/mvc/putUser',user);
      }; 
}]);

