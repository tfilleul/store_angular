'use strict';

var app = angular.module('store');

app.controller('UserController',['$scope','$rootScope','$http','usersService','refService','$log','$location','$q','$route', function($scope,$rootScope,$http,usersService,refService,$log,$location,$q,$route){

	$scope.list = [];
		
	var id = $route.current.params.id;
	
	$scope.format = 'dd/MM/yyyy';
	$scope.date = new Date();
	
   
	$scope.getUser = function(id) {
		
		$q.all([refService.getRef(0),usersService.getUsers(id)])		
		.then(function(reponse) 
				{
					$log.debug('Retour succes de searchFirstThesaurus');					
					$scope.user = reponse[1].data;	
					if ($scope.user.idpicture) {
						$scope.imageUrl = usersService.getUrlProfilPicture($scope.user.idpicture);
					} else {
						$scope.imageUrl = "images/yeoman.png"
					}
					$scope.profilList=reponse[0].data.listProfil;
				}			
		,function(error) 
				{
				$scope.addAlert({ type: 'danger', msg: "Impossible d'initialiser l utilisateur "});					
				});
	};
	
	$scope.getListUser = function() {
		
		$q.all([refService.getRef(0),usersService.getAllUsers()])		
		.then(function(reponse) 
				{
					$log.debug('Retour succes de searchFirstThesaurus');					
					$scope.list = reponse[1].data;
					$scope.profilList=reponse[0].data.listProfil;
				}			
		,function(error) 
				{
					$scope.addAlert({ type: 'danger', msg: "Impossible d'initialiser les users "});				
				});
	};
	
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
	 
	 $scope.go = function ( hash ) {
		  $location.path( hash );
	 };
	 
	 /* Ajout user */
	 $scope.addUser = function(user) {	
  	 
	  	 var formData = new FormData();
	     var file = $scope.picFile;
	    // var json = $scope.myJson;
	     formData.append("file", file);
	     formData.append("user",JSON.stringify(user));
	  	 	  	 
		 var cpuser = angular.copy(user);
		 usersService.addUser(formData)
			.success(
				function(response) 
					{
						$log.debug('Retour succes de searchFirstThesaurus');
						$scope.addMessage("Ajout d'un utilisateur");
						$scope.go("/panel");
					})
			.error( 
				function(response) 
					{
						$scope.addAlert({ type: 'danger', msg: response.message});
						$scope.message = {text: response};
					});	
					 
		 $scope.userForm.$setPristine();
		 user = {};
		 //resetForm();
	  };
	  
	  /* Mettre a jour User */
	  $scope.putUser = function(user) {	
		  	 
		  	 var formData = new FormData();
		     var file = $scope.picFile;
		     formData.append("file", file);
		     formData.append("user",JSON.stringify(user));
			 usersService.putUser(formData)
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
							$scope.message = {text: "Impossible de mettre a jour l utilisateur "};
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