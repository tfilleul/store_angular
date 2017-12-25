'use strict';

angular.module('store').service('productService', ['$rootScope', '$http', '$log', function($rootScope, $http, $log) {
	
	const BACKEND_URLS = {
            urlAddCart: '/store/mvc/product/add/cart',
            urlDeleteCart: '/store/mvc/product/delete/cart/',
            urlGetCart: '/store/mvc/product/get/cart'          
    };
	
	$log.debug("Call service cart");
	
	this.addCart = function (product) {    	  
        return $http.post($rootScope.config.APPLICATION_URL + BACKEND_URLS.urlAddCart,product)
        .then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };
  
    this.delCart = function (product) {    	  
        return $http.delete($rootScope.config.APPLICATION_URL + BACKEND_URLS.urlDeleteCart + product.id)
        .then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };
    
    this.getCart = function () {    	  
        return $http.get($rootScope.config.APPLICATION_URL + BACKEND_URLS.urlGetCart)
        .then(function(response) {
            return response;
        }, function(error) {
            return error;
        });
    };
	      
}]);

