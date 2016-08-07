'use strict';

/**
 * @ngdoc function
 * @name rfaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rfaApp
 */
angular.module('store')
  .controller('MainCtrl', ['$rootScope','authService','$scope','$timeout', function($rootScope, authService, $scope, $timeout) {
    $scope.alerts = [];    
    
    $scope.$on('event:notAllowedAccess', function(e, status) {
        var error = null;
        $scope.alerts = [];
        if (status == 401) {
          //error = "L'utilisateur n est pas connecté : impossible de proceder a cette action ";
          error = { type: 'danger', msg: "L'utilisateur n est pas connecté : impossible de proceder a cette action ou perte de session"};
          $scope.alerts.push(error);
          
          // time out
          if ($rootScope.authentification != null) {
	          authService.logout()
	          .success(
					function(response) 
						{
							delete $rootScope.authentification;
							$rootScope.loggedin = false;
							$rootScope.loggedout = true;
							$scope.showLoginErrorUserPass = false;							
						})
			  .error( 
					function(response) 
						{
							$scope.message = {text: $scope.date + " : Echec de la déconnexion"};
						});
	          }
        }
    });
    
	$scope.date = new Date();
	
	$scope.addMessage = function(message) {
		var objectMessage = "";
		objectMessage =  { type: 'success', msg: message}; 
		$scope.alerts.push(objectMessage);			
	}
	
	$scope.addAlert = function(alertObject,status) {
		
		if ( status == "401" ) {
			return;
		}
		
		if(!alertObject){
			alertObject = { type: 'danger', msg: 'Erreur démo', timeout: 1000};
		}

		$("html").animate({ scrollTop: 0 }, 600);
		$scope.alerts.push(alertObject);

		if(alertObject.timeout) {
			$timeout(function(){
				 $scope.closeAlert(alertObject);
			}, alertObject.timeout);
		}
	  }

	  $scope.closeAlert = function(obj) {
	  	var index = $scope.alerts.indexOf(obj);
		$scope.alerts.splice(index, 1);
	  };
  
	  
//	  $scope.$on('$routeChangeStart', function(event) {
//		$scope.alerts = [];
//	});

	  
  }]);
