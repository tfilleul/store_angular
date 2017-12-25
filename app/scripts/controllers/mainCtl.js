'use strict';

/**
 * @ngdoc function
 * @name rfaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rfaApp
 */
angular.module('store')
  .controller('MainCtrl', ['keycloak','$rootScope','authService','userService','$scope','$timeout','$location', function(keycloak,$rootScope, authService, userService, $scope, $timeout,$location) {
	  
	$scope.alerts = [];    
    
    $scope.$on('event:notAllowedAccess', function(e, response) {
        var error = null;
        var status = response.status;
       // $scope.alerts = [];
        switch (status) {
        case 400:
            break;
        case 401:
        	$location.path( "/search" );	        			
  	      //error = "L'utilisateur n est pas connecté : impossible de proceder a cette action ";
            error = { type: 'danger', msg: "L'utilisateur n est pas connecté : impossible de proceder a cette action ou perte de session"};
            $scope.alerts.push(error);
            
            // time out
            if ($rootScope.authentification != null) {
            	Keycloak.logout();
            	$rootScope.logout();
  	        }
            break;
        case 403:
        	error = { type: 'danger', msg: "L'utilisateur n est pas connecté : impossible de proceder a cette action ou perte de session"};
            $scope.alerts.push(error);
            if ($rootScope.authentification != null) {
            	keycloak.logout();
            	$rootScope.logout();
            }	
            break;
        case 404:
        	error = { type: 'danger', msg: "L'utilisateur n est pas connecté : impossible de proceder a cette action ou perte de session"};
            $scope.alerts.push(error);            
            break;
        case 409:
        	error = { type: 'danger', msg: "L'utilisateur n est pas connecté : impossible de proceder a cette action ou perte de session"};
            $scope.alerts.push(error);            
            break;
        default:
			$scope.addAlert({ type: 'danger', msg: response.message},status);
            break;
        }
        
    });
    
    $scope.go = function ( hash ) {
		  $location.path( hash );
	 };

    
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
  
	$scope.$on('keypress', function() {
  		delete $scope.alerts;
  	});  
	  
//	$scope.$on('$routeChangeStart', function(event) {
//		$scope.alerts = [];
//	});
	
		  
  }]);
