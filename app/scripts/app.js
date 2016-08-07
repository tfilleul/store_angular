'use strict';

/**
 * @ngdoc overview
 * @name rfaApp
 * @description
 * # rfaApp
 *
 * Main module of the application.
 */
angular
  .module('store', [
    'ui.bootstrap',                
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    // module bower at-table
    'angular-table',
    'ngSanitize',
    'ngTouch',
    'ngDropdowns',
	'ngDialog',
	'bgf.paginateAnything'	,
//	'angularUtils.directives.dirPagination',
//	'digitalfondue.dftabmenu',	
    'angucomplete-alt'
// 'angularFileUpload',
//  'cgBusy'
  ]
 )
  .config(['$logProvider', function($logProvider){
      $logProvider.debugEnabled(CONSTANTES.ENABLE_DEBUG);
  }])
  .config(['$provide', function ($provide) {
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
}])
  .config(
		  [ '$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
			  
	  $routeProvider
	  .when('/', {
	    title: "Recherche",
	    templateUrl: 'views/searchForm.html',
	    publicAccess: true
	  })
	  .when('/user/add', {
	    title: "Ajout utilisateur",
	    templateUrl: 'views/userForm.html',
	    publicAccess: false
	  })
	   .when('/user/put/:id', {
	    title: "Mise a jour utilisateur",
	    templateUrl: 'views/userForm.html',
	    publicAccess: false	
	  })
	   .when('/search', {
	    title: "Mise a jour utilisateur",
	    templateUrl: 'views/searchForm.html',
	    publicAccess: true
	  })
	   .when('/logout', { 
    	templateUrl: 'views/searchForm.html', 
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
	      
	        		if (status === 401) {
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
    $httpProvider.interceptors.push(function ($q, $rootScope, $location) {
        return {
        	'request': function($config) {
        		var isRestCall = $config.url.indexOf('rest') >= 0;
        		var isImportCall = $config.url.indexOf('mvc') >= 0;
         		if (isRestCall && angular.isDefined($rootScope.authentification)) {
        			if (angular.isDefined($rootScope.authentification.token)){
        				$config.headers['X-Auth-Token'] = $rootScope.authentification.token;
        			}
        		}
        		
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
   
}]
).run(function($rootScope, $location, $cookieStore,$route) {
	
	
	var routesOpenToPublic = [];
    angular.forEach($route.routes, function(route, path) {
        // push route onto routesOpenToPublic if it has a truthy publicAccess value
        route.publicAccess && (routesOpenToPublic.push(path));
    });

//    $rootScope.$on('$routeChangeStart', function(event, nextLoc, currentLoc) {
//        var closedToPublic = (-1 === routesOpenToPublic.indexOf($location.path()));
//        if(closedToPublic && !$rootScope.loggedin) {
//            $location.path('/search');
//        }
//    });	

/* Reset error when a new view is loaded */
$rootScope.$on('$viewContentLoaded', function() {
	delete $rootScope.error;
});

$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
      $rootScope.title = current.$$route.title;
  });

$rootScope.CONSTANTES = CONSTANTES;

$rootScope.logout = function() {
	delete $rootScope.user;
	delete $rootScope.authToken;
	$location.path("/search");
};

$rootScope.initialized = true;
})
.value('cgBusyDefaults',{
  message:'Recherche en cours...',
});
