var app = angular.module('store');

app.controller('StoreController',['$scope','$rootScope','$http', function($scope,$rootScope,$http){

	$rootScope.products = [];
	
	$http.get('./data/products.json').success(function(data){		
		$rootScope.products = data;
	});
	
}]);