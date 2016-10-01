(function () {

    'use strict';

    angular
        .module('store')
        .run(['$rootScope', '$location','$cookieStore','$route','$log', run]);
    
    function run($rootScope, $location, $cookieStore,$route,$log) {	
    	
    	var routesOpenToPublic = [];
        angular.forEach($route.routes, function(route, path) {
            // push route onto routesOpenToPublic if it has a truthy publicAccess value
            route.publicAccess && (routesOpenToPublic.push(path));
        });

        $rootScope.$on('$routeChangeStart', function(event, nextLoc, currentLoc) {
            var closedToPublic = (-1 === routesOpenToPublic.indexOf($location.path()));
            if(closedToPublic && !$rootScope.loggedin) {
                $location.path('/search');
            }
        });	

    	/* Reset error when a new view is loaded */
    	$rootScope.$on('$viewContentLoaded', function() {
    		delete $rootScope.alerts;
    	});

    	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
    	      //$rootScope.title = current.$$route.title;
    	  });

    	$rootScope.CONSTANTES = CONSTANTES;

    	$rootScope.logout = function() {
    		delete $rootScope.user;
    		delete $rootScope.authToken;
    		delete $rootScope.authentification;
    		$rootScope.loggedin = false;
    		$rootScope.loggedout = true;
    		$scope.showLoginErrorUserPass = false;
    		$location.path("/search");
    	};

    	$rootScope.initialized = true;
    } 
   
})();
