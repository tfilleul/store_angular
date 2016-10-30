(function () {

    'use strict';

    angular
            .module('store')
            .config(['$routeProvider', '$locationProvider','$logProvider','$provide', '$httpProvider',  '$compileProvider', config]);

    function config($routeProvider, $locationProvider,$logProvider,$provide, $httpProvider, $compileProvider) {


      $logProvider.debugEnabled(config.ENABLE_DEBUG);      
      $httpProvider.defaults.withCredentials = true;
   
      $provide.decorator('$log', ['$delegate', function ($delegate) {
        // Keep track of the original debug method, we'll need it later.
        var origDebug = $delegate.debug;
        /*
         * Intercept the call to $log.debug() so we can add on 
         * our enhancement. We're going to add on a date and 
         * time stamp to the message that will be logged.
         */
        $delegate.debug = function () {
            var args = [].slice.call(arguments);
            args[0] = [new Date().toString(), ': ', args[0]].join('');
            
            // Send on our enhanced message to the original debug method.
            origDebug.apply(null, args);
        };

        return $delegate;
      }]);
  		  
	  $routeProvider
	  .when('/', {
	    title: "Recherche",
	    templateUrl: 'views/search/searchForm.html',
	    publicAccess: true
	  })
	  .when('/user/add', {
	    title: "Ajout utilisateur",
	    templateUrl: 'views/user/userForm.html',
	    publicAccess: false
	  })
	   .when('/user/put/:id', {
	    title: "Mise a jour utilisateur",
	    templateUrl: 'views/user/userForm.html',
	    publicAccess: false	
	  })
	  .when('/user/get/:id', {
	    title: "Affiche un utilisateur",
	    templateUrl: 'views/user/userView.html',
	    publicAccess: true	
	  })
	   .when('/product/get/:id', {
	    title: "Affiche un utilisateur",
	    templateUrl: 'views/product/productView.html',
	    publicAccess: true	
	  })
	  .when('/cart', {
	    title: "Affiche le panier",
	    templateUrl: 'views/product/cart.html',
	    publicAccess: true	
	  })
	  .when('/productsTab', {
	    title: "Affiche les produits",
	    templateUrl: 'views/product/productListTab.html',
	    publicAccess: true	
	  })
	  .when('/products', {
	    title: "Affiche les produits",
	    templateUrl: 'views/product/productList.html',
	    publicAccess: true	
	  })
	   .when('/search', {
	    title: "Mise a jour utilisateur",
	    templateUrl: 'views/search/searchForm.html',
	    publicAccess: true
	  })
	   .when('/loginModal', {
	    title: "Connexion",
	   // templateUrl: 'views/searchForm.html',
	    publicAccess: true
	  })
	   .when('/logout', { 
    	templateUrl: 'views/search/searchForm.html', 
    	controller: 'AuthCtrl' 
      })
	   .when('/panel', {
	    title: "Mise a jour utilisateur",
	    templateUrl: 'views/panels.html',
	    publicAccess: false
	  })
	  .otherwise({
	    redirectTo: '/'
	      });
	  
	  /* Register error provider that shows message on failed requests or redirects to login page on
		 * unauthenticated requests */
	    $httpProvider.interceptors.push(function ($q, $rootScope, $location) {
		        return {
		        	'responseError': function($rejection) {
		        		var status = $rejection.status;
		        		var config = $rejection.config;
		        		var method = config.method;
		        		var url = config.url;
		      
		        		if (status === 401 ) {
		        			$location.path( "/search" );	        			
		        			$rootScope.$broadcast('event:notAllowedAccess', status);
		        		} else {
		        			$rootScope.error = method + " on " + url + " failed with status " + status;
		        		}
		        		return $q.reject($rejection);
		        	}
		        };
		    }
	    );
	    
	    /* Registers auth token interceptor, auth token is passed by header
	     * as soon as there is an authenticated user */
	    $httpProvider.interceptors.push(function ($q, $rootScope, $location, $cookies,$window) {
	        return {
	        	'request': function($config) {	        		
	        		var isRestCall = $config.url.indexOf('rest') >= 0;
	        		var isImportCall = $config.url.indexOf('mvc') >= 0;
	         		if (isRestCall && angular.isDefined($rootScope.authentification)) {
	        			if (angular.isDefined($rootScope.authentification.token)){
	        				$config.headers['X-Auth-Token'] = $rootScope.authentification.token;
	        			}
	        		}
	        		
	         		// check token only if authentified
	        		if (isImportCall && angular.isDefined($rootScope.authentification)) {
	        			if (angular.isDefined($rootScope.authentification.token)){
	        				$config.headers['X-Auth-Token'] = $rootScope.authentification.token;
	        			}
	        		}
	        		
	        		return $config;
	        		}
	        	};
	    }
	   ); 
    }
})();

