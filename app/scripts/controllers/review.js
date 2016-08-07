'use strict';

var app = angular.module('store');

app.controller("ReviewController", ['$scope','$rootScope','$log', function($scope,$rootScope,$log){
	
	$log.debug("ReviewController");
	
	$scope.review = {};
	
	$scope.addReview = function(product) {
		product.reviews.push(angular.copy($scope.review));
	};
	
	}]);