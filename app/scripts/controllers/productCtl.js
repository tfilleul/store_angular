'use strict';

var app = angular.module('store');

app.controller('ProductController',['$scope','$rootScope','$http','productService','storeService','$log','$location','$q','$route', function($scope,$rootScope,$http,productService,storeService,$log,$location,$q,$route){

	var ressource = 'product';  
	$scope.products = [];
	$scope.cart = [];

	var id = $route.current.params.id;
	
	//$scope.products = [{id:"1",description:"Test1"},{id:"2",description:"test2"}];
	//$scope.product = {id:"1",description:"test"};
		
	$scope.go = function ( hash ) {
		  $location.path( hash );
	};
	
	$scope.addCart = function ( product ) {
		
		productService.addCart(product)
		.then(
			function(response) {
				if (response.status == 200) 
				{
					$log.debug('Retour succes de l ajout du produit dans le panier');
					$scope.addMessage("Le produit a été ajouté dans le panier");
				}});
	};
	
	$scope.delCart = function ( product ) {
			
			productService.delCart(product)
			.then(
				function(response) {
					if (response.status == 200)
					{
						$log.debug('Retour succes de suppression du produit dans le panier');
						$scope.addMessage("Suppression d'un produit");
						$scope.cart.splice($scope.products.indexOf(product),1);
						//$scope.go("/cart");
					}});				
		};

	
	$scope.getCart = function () {
		
		productService.getCart()
		.then(
			function(response) {
				if (response.status == 200)					
				{
					$log.debug('Affiche panier');
					$scope.cart = response.data;						
	
				}});			
		
	};
	
	$scope.getProduct = function(id) {
		
		$q.all([storeService.getObject(id,ressource)])		
		.then(function(response) 
				{						
				$log.debug('Retour succes de tous les produits');					
				$scope.product = response[0].data;
				});
	};
	
	$scope.getProducts = function() {
		
		var ressource = 'product';  
		
		storeService.getAllObject(ressource)	
		.then(function(response) 
				{						
				$log.debug('Retour succes de searchFirstThesaurus');					
				$scope.products = response.data;
	
		});
	};
	
	 $log.info("identifiant de la route " + id);
	 if( id !== "" && id !== undefined) {
		  $scope.getProduct(id);
	 }
	
}]);