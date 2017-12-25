'use strict';

var app = angular.module('store');

app.controller('SearchControlleur',['$scope','$rootScope','$http','userService','$log','$location','$route',
                                   function($scope,$rootScope,$http,userService,$log,$location,$route){

	$scope.listUser = [];
	$scope.criteria = {};
	$scope.criteriaObject = {};
	
   //$scope.listUser = [{id:"null",profil:{id:3,profil:"User",label:"Utilisateur",version:2},name:"cesar",firstname:"jules",password:"admin",mail:"test@gmail.com",birthdate:163724400000,age:25,version:9,idpicture:"abc9f4ec-64b5-4656-b026-9f9d8f558225"}];
	
	$scope.getListUser = function() {
		if ($scope.criteria.firstName === "") $scope.criteria.firstName = undefined;
		if ($scope.criteria.age === "") $scope.criteria.age = undefined;
		$scope.criteria.name = $scope.criteriaObject.selected.name;
		userService.getUsersByCritera($scope.criteria)
		.success(
			function(response) 
				{
					$log.debug('Retour succes de searchFirstThesaurus');					
					$scope.listUser = response;				
					if ($scope.listUser.size === 0) {
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
	 
	  $scope.disabled = undefined;
	  $scope.searchEnabled = undefined;

	  $scope.setInputFocus = function (){
	    $scope.$broadcast('UiSelectDemo1');
	  };

	  $scope.enable = function() {
	    $scope.disabled = false;
	  };

	  $scope.disable = function() {
	    $scope.disabled = true;
	  };

	  $scope.enableSearch = function() {
	    $scope.searchEnabled = true;
	  };

	  $scope.disableSearch = function() {
	    $scope.searchEnabled = false;
	  };

	  $scope.clear = function() {
	    $scope.user.selected = undefined;	    
	  };
	  
	  
	  $scope.tagTransform = function (newTag) {
		    var item = {
		        name: newTag,
		        email: newTag.toLowerCase()+'@email.com',
		        age: 'unknown',
		        country: 'unknown'
		    };

		    return item;
	   };
	  	  
	   $scope.refreshUser = function(username) {
		   if (username.length >= 2 ) {
			   var param = {"name":username};
			   userService.getUsersNameByCritera(param)
				.success(
					function(response) 
						{
							$log.debug('Retour succes de searchFirstThesaurus');					
							$scope.listUserSelect = response;				
							if ($scope.listUserSelect.size === 0) {
								$scope.addMessage("Aucun utilisateurs trouvés")
							}
						})
				.error( 
					function(response) 
						{
							$scope.addAlert({ type: 'danger', msg: "Impossible de proceder à la recherche "});					
						});
		   }
		};
	 
}]);