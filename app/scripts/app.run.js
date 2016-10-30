(function () {

    'use strict';

    angular
        .module('store')
        .run(['$rootScope', '$location','$cookies','$route','$log','$window', run]);
    
    function run($rootScope, $location, $cookies,$route,$log,$window) {	
    	
    	$log.debug('##### reload auth :' + $window.localStorage.getItem('auth'));
    	//$log.debug('##### reload cookie :' + $cookies.get('auth'));

    	
    	if ($window.localStorage.getItem('auth') != null) {
    		var authentification = JSON.parse($window.localStorage.getItem('auth'));
    		$rootScope.user = authentification.user;
    		$rootScope.authToken = authentification.token;
    		$rootScope.authentification = authentification;
    		$rootScope.loggedin = true;
    		$rootScope.loggedout = false;
    		//$scope.showLoginErrorUserPass = true;
    	
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
    	$rootScope.$on('$viewContentLoaded', function() {
    		delete $rootScope.alerts;
    	});

    	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
    	      //$rootScope.title = current.$$route.title;
    	  });

    	$rootScope.config = config;

    	$rootScope.initialized = true;
    } 
   
})();
