'use strict';

var app = angular.module('store');

app.controller('ProductController',['$scope','$rootScope','$http','storeService','refService','$log','$location','$q','$route', function($scope,$rootScope,$http,storeService,refService,$log,$location,$q,$route){

	var ressource = 'product';  
	$scope.products = [];
	
	var id = $route.current.params.id;
	
	//$scope.products = [{id:"1",description:"Test1"},{id:"2",description:"test2"}];
	//$scope.product = {id:"1",description:"test"};
		
	$scope.go = function ( hash ) {
		  $location.path( hash );
	};
	
	$scope.getProduct = function(id) {
		
		$q.all([refService.getRef(0),storeService.getObject(id,ressource)])		
		.then(function(reponse) 
				{
					$log.debug('Retour succes de searchFirstThesaurus');					
					$scope.product = reponse[1].data;						
					//$scope.profilList=reponse[0].data.listProfil;
				}			
		,function(error) 
				{
					$scope.addAlert({ type: 'danger', msg: "Impossible d'initialiser le produit "});					
				});
	};
	
	$scope.getProducts = function() {
		
		var ressource = 'product';  
		
		$q.all([refService.getRef(0),storeService.getAllObject(ressource)])		
		.then(function(reponse) 
				{
					$log.debug('Retour succes de searchFirstThesaurus');					
					$scope.products = reponse[1].data;
				//	$scope.profilList=reponse[0].data.listProfil;
				}			
		,function(error) 
				{
					$scope.addAlert({ type: 'danger', msg: "Impossible d'initialiser les products "});				
				});
	};
	
	 $log.info("identifiant de la route " + id);
	 if( id !== "" && id !== undefined) {
		  $scope.getProduct(id);
	 }
	
}]);