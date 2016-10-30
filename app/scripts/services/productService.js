'use strict';

angular.module('store').service('productService', ['$rootScope', '$http', '$log', function($rootScope, $http, $log) {
	$log.debug("Call service cart");
	
	this.addCart = function (product) {    	  
        return $http.post($rootScope.config.APPLICATION_URL + '/store/mvc/product/add/cart',product);        		 
    };
  
    this.delCart = function (product) {    	  
        return $http.delete($rootScope.config.APPLICATION_URL + '/store/mvc/product/delete/cart/'+ product.id);        		 
    };
    
    this.getCart = function () {    	  
        return $http.get($rootScope.config.APPLICATION_URL + '/store/mvc/product/get/cart');        		 
    };
	      
}]);

