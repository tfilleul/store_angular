'use strict';

var app = angular.module('store');

app.controller('SearchControlleur',['$scope','$rootScope','$http','usersService','$log','$location','$route',
                                   function($scope,$rootScope,$http,usersService,$log,$location,$route){

	$scope.list = [];

//	$scope.criteria = { name:"",firstname:"",age:""};
	
	$scope.getListUser = function() {
		usersService.getUsersByCritera($scope.criteria)
		.success(
			function(response) 
				{
					$log.debug('Retour succes de searchFirstThesaurus');					
					$scope.list = response;
					if ($scope.list.size == 0) {
						
					}
				})
		.error( 
			function(response) 
				{
					$scope.addAlert({ type: 'danger', msg: "Impossible de proceder à la recherche "});					
				});
	};
	
	$scope.config = {
	    itemsPerPage: 5,
	    fillLastPage: true
	};
	 
	 $scope.go = function ( hash ) {
		  $location.path( hash );
	 }; 
	  
	  $scope.searchUser = function() {	
		  $scope.getListUser();		  
	  } 	  
	 
}]);