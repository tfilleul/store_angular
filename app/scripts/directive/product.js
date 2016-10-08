'use strict';

(function(){
	
var app = angular.module('store');

app.directive('productTitle', function(){
	return {
		restrict: 'A',
		templateUrl: './views/product/product-title.html'
	};
});

app.directive('userListTitle', function(){
	return {
		restrict: 'A',
		templateUrl: './views/search/searchUsersList.html'
	};
});

//app.directive('productPanels', function(){
//	return {
//	restrict: 'E',
//	templateUrl: './views/product-panels.html'	
//	};
//});

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            
        	var reader = new FileReader();
        	
        	reader.onload = function(event) {
            	scope.imageUrl = event.target.result;
            	$parse(attrs.fileModel).assign(scope, element[0].files[0]);
            	scope.$apply();
        	}         	
        	
            element.bind('change', function(){
                	reader.readAsDataURL(element[0].files[0]);
            });
        }
    };
}]);

})();