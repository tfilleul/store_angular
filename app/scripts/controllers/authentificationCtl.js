'use strict';

/**
 * @ngdoc function
 * @name rfaApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the rfaApp
 */
angular.module('store').controller('AuthCtrl', ['keycloak','$rootScope', '$scope', '$location','authService', 'ngDialog', '$log','$window','$cookies',
		 function(keycloak,$rootScope, $scope,$location,authService,ngDialog, $log,$window,$cookies) {
	
	 $log.debug("Loading AuthCtrl");	  
 
	 $scope.showLoginErrorUserPass = false;
		 
	  if ($rootScope.authentification === undefined) {
		  $rootScope.loggedin = false;
		  $rootScope.loggedout = true;
	  }
	  else {
		  $rootScope.loggedin = true;
		  $rootScope.loggedout = false;
	  }
	
	  $scope.connect = function () {
		  ngDialog.open({
			    template: 'views/login.html',
			    controller: 'AuthCtrl'
			});};
		  
	  $scope.login = function () {		  
		  $log.debug("Appel de login");
		  $scope.showLoginErrorUserPass = false;		  
		  keycloak.login();		  		  	  
     };
	  
	  $scope.logout = function () {		
		keycloak.logout();
		$window.localStorage.clear();
		delete $rootScope.authentification;
		$rootScope.loggedin = false;
		$rootScope.loggedout = true;
		$scope.showLoginErrorUserPass = false;
		$location.path('/search');	      
	  };
	  
	$scope.goTo = function(hash) {
		$location.path(hash);
	};

	$scope.closeModal = function() {
		$('#loginModal').modal('hide');
		$scope.showLoginErrorUserPass = false;
	};
	
}]);


