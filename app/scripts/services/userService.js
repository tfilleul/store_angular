'use strict';

angular.module('store').service('userService', ['$rootScope', '$http', '$log', function($rootScope, $http, $log) {
	$log.debug("Call service users");
	
	this.getUrlProfilPicture = function (idPicture) {    	 
        return $rootScope.config.APPLICATION_URL+'/store/mvc/user/picture/'+idPicture;
    };
         
	this.getUser = function (id) {    	 
          return $http.get($rootScope.config.APPLICATION_URL+'/store/mvc/user/'+id);
      };
      
     this.getAllUsers = function (id) {    	 
          return $http.get($rootScope.config.APPLICATION_URL+'/store/mvc/users');
      };  
      
    this.getUsersByCritera = function (critere) {    	 
          return $http.post($rootScope.config.APPLICATION_URL + '/store/mvc/user/search',critere);
    };  
      
    this.addUser = function (formData) {    	  
          return $http.post($rootScope.config.APPLICATION_URL + '/store/mvc/user/add',formData,
        		  { transformRequest: angular.identity,
        	  		headers: {'Content-Type': undefined }        			
        		  });
      };
     
     this.putUser = function (formData) {    
    	  return $http.post($rootScope.config.APPLICATION_URL +'/store/mvc/user/put',formData,    			  
        		  { transformRequest: angular.identity,
        	  		headers: {'Content-Type': undefined }        			
        		  });
      }; 
          
}]);

