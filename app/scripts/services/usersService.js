angular.module('store').service('usersService', ['$rootScope', '$http', '$log', function($rootScope, $http, $log) {
	$log.debug("Call service users");
      
	this.getUsers = function (id) {    	 
          return $http.get(CONSTANTES.APPLICATION_URL+'/store/mvc/getUser?id='+id);
      };
      
     this.getAllUsers = function (id) {    	 
          return $http.get(CONSTANTES.APPLICATION_URL+'/store/mvc/getAllUser');
      };  
      
    this.getUsersByCritera = function (critere) {    	 
          return $http.post(CONSTANTES.APPLICATION_URL + '/store/mvc/getUserByCriteria',critere);
    };  
      
    this.addUser = function (user) {    	  
          return $http.post(CONSTANTES.APPLICATION_URL + '/store/mvc/addUser',user);
      };
     
     this.putUser = function (user) {    	  
          return $http.put(CONSTANTES.APPLICATION_URL +'/store/mvc/putUser',user);
      }; 
}]);

