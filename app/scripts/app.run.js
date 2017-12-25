(function () {

    'use strict';
    
    angular.element(document).ready(function () {
    	
    	var kc = {"realm" : "store",				  		  
				   "url" : "http://mykeycloak:8090/auth",
				   "sslRequired" : "external",				  
				  "clientId" : "store-client-front",
				  "public-client": true,
				  "disable-trust-manager": true
    	};
    	    	
       var keycloakAuth = new Keycloak(kc);
        
       if (window.localStorage.getItem('authentified')) {
        	        	 
        	keycloakAuth.init({onLoad:'login-required'}).success(function (autentificated) {
                 angular.module('store').factory('keycloak', function() {
                         return keycloakAuth;
                });
                angular.bootstrap(document, ['store']);
             }).error(function () {
                     window.location.reload();
             });    	
       } else {        	
    	   keycloakAuth.init().success(function (autentificated) {
    		   		if (autentificated) {
    		   			window.localStorage.setItem('authentified',true);
    		   		}
    		   		angular.module('store').factory('keycloak', function() {
                       return keycloakAuth;
                   });
    		   		angular.bootstrap(document, ['store']);
           }).error(function () {
                   window.location.reload();
           });        	
        }     
 
    });

    angular
        .module('store')
        .run(['keycloak','$rootScope', '$location','$cookies','$route','$log','$window','authService', run]);
    
    function run(keycloak,$rootScope, $location, $cookies,$route,$log,$window,authService) {	
    	
    	$log.debug('##### reload auth :' + $window.localStorage.getItem('authentified'));
    	
    	$rootScope.alerts = [];
    	
    	if (keycloak.authenticated ) {
 	  		var criteria = {};
 	  		$rootScope.authentification = {};
 	  		criteria.email = keycloak.tokenParsed.email
 	  	    authService.login(criteria).
 	  	    then(function(response) {
 	  	    	if (response.status == 200) {		
	 	  		  $log.debug("Setting root scope");
	 	  		  // on stoke le token dans l'objet authentification
	 	  		  $rootScope.authentification.token = keycloak.token;
	 	  		  $rootScope.loggedin = true;
	 	  		  $rootScope.loggedout = false;
	 	  		  $rootScope.alerts.push("Vous êtes bien connecté !");
	 	          $location.path($rootScope.pathAtferLogin);
	 	          if (response.data.length > 0) {
	 	        	  $rootScope.authentification.user = response.data[0];
	 	          }
				} 
 	  		})		
 	  	}
    	
    	var routesOpenToPublic = [];
        angular.forEach($route.routes, function(route, path) {
            // push route onto routesOpenToPublic if it has a truthy publicAccess value
            route.publicAccess && (routesOpenToPublic.push(path));
        });

        $rootScope.$on('$routeChangeStart', function(event, nextLoc, currentLoc) {
            var closedToPublic = (-1 === routesOpenToPublic.indexOf($location.path()));
            if(closedToPublic && !$rootScope.loggedin) {
               // $location.path('/search');
            }
        });	

    	/* Reset error when a new view is loaded */
//    	$rootScope.$on('$viewContentLoaded', function() {
//    		delete $rootScope.alerts;
//    	});
    	
    	$rootScope.$on('keypress', function() {
    		delete $rootScope.alerts;
    	});

    	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
    	      //$rootScope.title = current.$$route.title;
    	  });

    	$rootScope.config = config;

    	$rootScope.initialized = true;
    	
    	// deal with time out process
    	$rootScope.logout = function() {
			$window.localStorage.clear();
    		delete $rootScope.user;
    		delete $rootScope.authentification;
    		$rootScope.loggedin = false;
			$rootScope.loggedout = true;
    		$location.path("/search");
    	};
    } 
   
})();
