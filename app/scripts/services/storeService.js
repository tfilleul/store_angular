'use strict';

angular.module('store').service('storeService', ['$rootScope', '$http', '$log', function($rootScope, $http, $log) {
	$log.debug("Call service store");
	
	const BACKEND_URLS = '/store/mvc/';
	
	this.getObject = function (id,ressource) {    	 
          return $http.get($rootScope.config.APPLICATION_URL+ BACKEND_URLS +ressource+'/'+id)
          .then(function(response) {
              return response;
          }, function(error) {
              return error;
          });
      };
      
     this.getAllObject = function (ressource) {    	 
          return $http.get($rootScope.config.APPLICATION_URL+BACKEND_URLS + ressource+ '/'+ ressource+ 's')
          .then(function(response) {
              return response;
          }, function(error) {
              return error;
          });
      };  
      
    this.getObjectByCritera = function (critere,ressource) {    	 
          return $http.post($rootScope.config.APPLICATION_URL + BACKEND_URLS + ressource+'/search',critere)
          .then(function(response) {
              return response;
          }, function(error) {
              return error;
          });
    };  
      
    this.addObject = function (storeObject,ressource) {    	  
          return $http.post($rootScope.config.APPLICATION_URL + BACKEND_URLS + ressource+'/add',storeObject)
          .then(function(response) {
              return response;
          }, function(error) {
              return error;
          });
      };
     
     this.putObject = function (storeObject,ressource) {    
    	  return $http.put($rootScope.config.APPLICATION_URL +BACKEND_URLS+ressource+'/put',storeObject)
    	  .then(function(response) {
              return response;
          }, function(error) {
              return error;
          });
      }; 
          
}]);

