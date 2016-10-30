'use strict';

var app = angular.module('store');

app.controller('SearchControlleur',['$scope','$rootScope','$http','userService','$log','$location','$route',
                                   function($scope,$rootScope,$http,userService,$log,$location,$route){

	$scope.list = [];
	
   //$scope.list = [{id:"null",profil:{id:3,profil:"User",label:"Utilisateur",version:2},name:"cesar",firstname:"jules",password:"admin",mail:"test@gmail.com",birthdate:163724400000,age:25,version:9,idpicture:"abc9f4ec-64b5-4656-b026-9f9d8f558225"}];
	
	$scope.getListUser = function() {
		userService.getUsersByCritera($scope.criteria)
		.success(
			function(response) 
				{
					$log.debug('Retour succes de searchFirstThesaurus');					
					$scope.list = response;				
					if ($scope.list.size === 0) {
						$scope.addMessage("Aucun utilisateurs trouvés")
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
	  }; 	 
	  
	  $scope.getUrlImageProfil = function (idPicture) {
			if (idPicture) {
				return userService.getUrlProfilPicture(idPicture);
			} else {
				return 	$rootScope.config.DEFAULT_PROFIL_IMAGE;

			}	
	  }

	 
}]);