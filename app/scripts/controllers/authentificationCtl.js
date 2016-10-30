'use strict';

/**
 * @ngdoc function
 * @name rfaApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the rfaApp
 */
angular.module('store').controller('AuthCtrl', ['$rootScope', '$scope', '$location','authService', 'ngDialog', '$log','$window','$cookies',
		 function($rootScope, $scope,$location,authService,ngDialog, $log,$window,$cookies) {
	
	  $log.debug("Loading AuthCtrl");
	   
	  $scope.showLoginErrorUserPass = false;
	  
	  $scope.openModal = function() {
		  $rootScope.pathAtferLogin = $location.$$url;
          $('#loginModal').modal('show');
	  };
	 
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
		  authService.login($scope.credentials)
	      	.success(
					function(response) 
						{
							  $log.debug("Setting root scope");
							  // on stoke le token dans l'objet authentification
							  $window.localStorage.setItem('auth',JSON.stringify(response));
							  //$cookies.put('auth', JSON.stringify(response));
							  $rootScope.authentification = response;
							  $rootScope.loggedin = true;
							  $rootScope.loggedout = false;
							  $scope.credentials = {};							  
							  $scope.addMessage("Vous êtes bien connecté !!");
					          $location.path($rootScope.pathAtferLogin);
							//  $location.path('/panel');
					          $('#loginModal').modal('hide');
						})
			.error( 
					function(response) 
						{
							 $scope.showLoginErrorUserPass = true;
						});
	  };
	  
	  $scope.logout = function () {
		  authService.logout()
			  .success(
						function(response) 
							{
								$window.localStorage.clear();
								//$window.localStorage.removeItem('auth');
								delete $rootScope.authentification;
								$rootScope.loggedin = false;
								$rootScope.loggedout = true;
								$scope.showLoginErrorUserPass = false;
								$location.path('/search');
							})
				.error( 
						function(response) 
							{
								$scope.message = {text: $scope.date + " : Echec de la déconnexion"};
							});
	      
	  };
	  
	$scope.goTo = function(hash) {
		$location.path(hash);
	};

	$scope.closeModal = function() {
		$('#loginModal').modal('hide');
		$scope.showLoginErrorUserPass = false;
	};
}]);


