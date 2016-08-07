'use strict';

(function(){
	
var app = angular.module('store-product', [ ]);

app.directive('productTitle', function(){
	return {
		restrict: 'A',
		templateUrl: './views/product-title.html'
	};
});

app.directive('productPanels', function(){
	return {
	restrict: 'E',
	templateUrl: './views/product-panels.html'	
	};
});

})();