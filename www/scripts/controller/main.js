'use strict';

/**
 * @ngdoc function
 * @name rfaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rfaApp
 */
angular.module('store')
  .controller('MainCtrl', ['$rootScope','$scope','$timeout', function($rootScope, $scope, $timeout) {
    $scope.alerts = [];
    
	$scope.date = new Date();
	
	 $scope.addAlert = function(alertObject) {
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
	  
	  $scope.$on('$routeChangeStart', function(event) {
		$scope.alerts = [];
	});

	  
  }]);
