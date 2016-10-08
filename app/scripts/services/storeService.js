'use strict';

angular.module('store').service('storeService', ['$rootScope', '$http', '$log', function($rootScope, $http, $log) {
	$log.debug("Call service store");
	
	this.getObject = function (id,ressource) {    	 
          return $http.get(CONSTANTES.APPLICATION_URL+'/store/mvc/'+ressource+'/'+id);
      };
      
     this.getAllObject = function (ressource) {    	 
          return $http.get(CONSTANTES.APPLICATION_URL+'/store/mvc/'+ressource+'s');
      };  
      
    this.getUsersByCritera = function (critere,ressource) {    	 
          return $http.post(CONSTANTES.APPLICATION_URL + '/store/mvc/'+ressource+'/search',critere);
    };  
      
    this.addUser = function (storeObject,ressource) {    	  
          return $http.post(CONSTANTES.APPLICATION_URL + '/store/mvc/'+ressource+'/add',storeObject);        		 
      };
     
     this.putObject = function (storeObject,ressource) {    
    	  return $http.put(CONSTANTES.APPLICATION_URL +'/store/mvc/'+ressource+'/put',storeObject); 
      }; 
          
}]);

