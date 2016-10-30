'use strict';

var app = angular.module('store');

app.controller('ProductController',['$scope','$rootScope','$http','productService','storeService','$log','$location','$q','$route', function($scope,$rootScope,$http,productService,storeService,$log,$location,$q,$route){

	var ressource = 'product';  
	$scope.products = [];
	
	var id = $route.current.params.id;
	
	//$scope.products = [{id:"1",description:"Test1"},{id:"2",description:"test2"}];
	//$scope.product = {id:"1",description:"test"};
		
	$scope.go = function ( hash ) {
		  $location.path( hash );
	};
	
	$scope.addCart = function ( product ) {
		
		productService.addCart(product)
		.success(
			function(response) 
				{
					$log.debug('Retour succes de l ajout du produit dans le panier');
					$scope.addMessage("Le produit a été ajouté dans le panier");
				//	$scope.go("/panel");
				})
		.error( 
			function(response) 
				{
					$scope.addAlert({ type: 'danger', msg: response.message});
					$scope.message = {text: response};

			});	
		
	};
	
	$scope.delCart = function ( product ) {
			
			productService.delCart(product)
			.success(
				function(response) 
					{
						$log.debug('Retour succes de suppression du produit dans le panier');
						$scope.addMessage("Suppression d'un produit");
						$scope.cart.splice($scope.products.indexOf(product),1);
						//$scope.go("/cart");
					})
			.error( 
				function(response) 
					{
						$scope.addAlert({ type: 'danger', msg: response.message});
						$scope.message = {text: response};
	
				});	
			
		};

	
	$scope.getCart = function () {
		
		productService.getCart()
		.success(
			function(response) 
				{
					$log.debug('Affiche panier');
					$scope.cart = response;						
	
				})
		.error( 
			function(response) 
				{
					$scope.addAlert({ type: 'danger', msg: response.message});
					$scope.message = {text: response};
		});	
		
	};
	
	$scope.getProduct = function(id) {
		
		$q.all([storeService.getObject(id,ressource)])		
		.then(function(reponse) 
				{
					$log.debug('Retour succes de searchFirstThesaurus');					
					$scope.product = reponse[0].data;						
					//$scope.profilList=reponse[0].data.listProfil;
				}			
		,function(error)
				{
					$scope.addAlert({ type: 'danger', msg: "Impossible d'initialiser le produit "});					
				});
	};
	
	$scope.getProducts = function() {
		
		var ressource = 'product';  
		
		$q.all([storeService.getAllObject(ressource)])		
		.then(function(reponse) 
				{
					$log.debug('Retour succes de searchFirstThesaurus');					
					$scope.products = reponse[0].data;
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