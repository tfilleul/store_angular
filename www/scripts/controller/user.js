var app = angular.module('store');

app.controller('UserController',['$scope','$rootScope','$http','usersService','refService','$log','$location','$q','$route', function($scope,$rootScope,$http,usersService,refService,$log,$location,$q,$route){

	$scope.list = [];
		
	var id = $route.current.params.id;
	
	getUser = function(id) {
		
		$q.all([refService.getRef(0),usersService.getUsers(id)])		
		.then(function(reponse) 
				{
					$log.debug('Retour succes de searchFirstThesaurus');					
					$scope.user = reponse[1].data;
					$scope.profilList=reponse[0].data.listProfil;
				}			
		,function(error) 
				{
					$scope.addAlert({ type: 'danger', msg: "Impossible d'initialiser l utilisateur "});
					$scope.message = {text: "Impossible d'initialiser la liste des thesaurus "};
				});
	}
	
	getListUser = function() {
		
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
				//	$scope.message = {text: "Impossible d'initialiser la liste des thesaurus "};
				});
	}
	
	$scope.isMajUser = function() {
		var id = $route.current.params.id;
		if( id != "" && id != undefined) {
			return true;
		}
		return false;
	}
	
	$scope.config = {
	    itemsPerPage: 5,
	    fillLastPage: true
	}
	 
	 $scope.go = function ( hash ) {
		  $location.path( hash );
	 };
		 
	 addUser = function(user) {
		 cpuser = angular.copy(user);
		 usersService.addUser(cpuser)
			.success(
				function(response) 
					{
						$log.debug('Retour succes de searchFirstThesaurus');
						$scope.message = {text: "Ajout d'un utilisateur"};
						$scope.go("/panel");
					})
			.error( 
				function(response) 
					{
						$scope.addAlert({ type: 'danger', msg: response.message});
						$scope.message = {text: response};
					});	
					 
		 $scope.userForm.$setPristine();
		 resetForm();
	  };
	  
	  putUser = function(user) {			 
			 usersService.putUser(user)
				.success(
					function(response) 
						{
							$log.debug('Retour succes de searchFirstThesaurus');			
							$scope.message = {text: "Utilisateur mis a jour"};
							$scope.go("/panel");
						})
				.error( 
					function(response) 
						{
							$scope.addAlert({ type: 'danger', msg: "Impossible d'ajouter l utilisateur "});
							$scope.message = {text: "Impossible de mettre a jour l utilisateur "};
						});
		  };
	  
	  function resetForm() {
		  $scope.user.name = '';
		  $scope.user.mail = '';
		  $scope.user.password = '';
	  }
	  
	  $scope.actionUser = function() {		
		  $log.info("user"+$scope.user.name);		  
		  if ($scope.isMajUser()) {
				 putUser($scope.user); 
		  } else {
				 addUser($scope.user);
		  }
	  }	  	  
	 
	  $log.info("identifiant de la route " + id);
	  if( id != "" && id != undefined) {
		getUser(id);
	  } else {
		getListUser();
	  }
	
}]);