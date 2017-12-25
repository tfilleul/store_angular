'use strict';

var app = angular.module('store');

app.controller('UserController',['$scope','$rootScope','$http','storeService','userService','refService','$log','$location','$q','$route', function($scope,$rootScope,$http,storeService,userService,refService,$log,$location,$q,$route){

	$scope.list = [];
		
	var id = $route.current.params.id;
	var ressource = 'user'
	
	$scope.format = 'dd/MM/yyyy';
	$scope.date = new Date();
	
	$scope.isMajUser = function() {
		var id = $route.current.params.id;
		if( id !== "" && id !== undefined) {
			return true;
		}
		return false;
	};
	
	$scope.config = {
	    itemsPerPage: 5,
	    fillLastPage: true
	};
	
	$scope.getUser = function(id) {
		$q.all([refService.getRef(0),storeService.getObject(id,ressource)])		
		.then(function(reponse) 
				{
					$log.debug('Retour succes de searchFirstThesaurus');					
					$scope.user = reponse[1].data;	
					if ($scope.user.idpicture) {
						$scope.imageUrl = userService.getUrlProfilPicture($scope.user.idpicture);						
					} else {
						$scope.imageUrl = "images/yeoman.png"							
					}
					$scope.profilList=reponse[0].data.listProfil;
				}	
		);
	};
	
	$scope.getListUser = function() {		
		$q.all([refService.getRef(0),storeService.getAllObject(ressource)])		
		.then(function(reponse) 
				{
					$log.debug('Retour succes de searchFirstThesaurus');					
					$scope.list = reponse[1].data;
					$scope.profilList=reponse[0].data.listProfil;
				}			
		);
	};
	
		 
	 /* Ajout user */
	 $scope.addUser = function(user) {	  	 
	  	 var formData = new FormData();
	     var file = $scope.picFile;
	    // var json = $scope.myJson;
	     formData.append("file", file);
	     formData.append("user",JSON.stringify(user));
	  	 	  	 
//		 var cpuser = angular.copy(user);
		 userService.addUser(formData)
			.success(
				function(response) 
					{
						$log.debug('Retour succes de searchFirstThesaurus');
						$scope.addMessage("Ajout d'un utilisateur");
						$scope.go("/panel");
					})
			.error( 
				function(response,status) 
					{
						$scope.addAlert({ type: 'danger', msg: response.message},status);
					});	
					 
		 $scope.userForm.$setPristine();
		 user = {};
		 //resetForm();
	  };
	  
	  /* Mettre a jour User */
	  $scope.putUser = function(user) {	
		  	 
		  	 var formData = new FormData();
		     var file = $scope.picFile;
		     // l utilisateur a charge une image
		     if (file) {
		    	 formData.append("file", file);
		    	 formData.append("user",JSON.stringify(user));
		     } else {
		    	 formData.append("file", null);
		    	 formData.append("user",JSON.stringify(user));
		     }
			 userService.putUser(formData)
				.success(
					function(response) 
						{
							$log.debug('Retour succes de searchFirstThesaurus');
							$scope.addMessage("Utilisateur mis a jour");							
							$scope.go("/panel");
						})
				.error( 
					function(response,status) 
						{
							$scope.addAlert({ type: 'danger', msg: "Impossible d'ajouter l utilisateur "},status);							
						});
	  };
	  
	  $scope.actionUser = function() {		
		  $log.info("user"+$scope.user.name);		  
		  if ($scope.isMajUser()) {
			  $scope.putUser($scope.user); 
		  } else {
			  $scope.addUser($scope.user);
		  }
	  };	  	  
	 
	  $log.info("identifiant de la route " + id);
	  if( id !== "" && id !== undefined) {
		  $scope.getUser(id);
	  } else {
		  $scope.getListUser();
	  }
	  
	  function resetForm() {
		  $scope.user.name = '';
		  $scope.user.firstname = '';
		  $scope.user.mail = '';
		  $scope.user.password = '';
	  }
	
}]);