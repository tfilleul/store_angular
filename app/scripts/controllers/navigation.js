'use strict';

/**
 * @ngdoc function
 * @name rfaApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the rfaApp
 */
 // By default the 'text' property will be used as the display text in the dropdown entry.
    // All options that are not dividers must have a 'text' property.
    // Or you can specify a different property name via the dropdown-item-label attribute.
    //
    // If an options object has an 'href' property set, then that dropdown entry
    //   will behave as a link and cannot be selected.
    
angular.module('store').controller('NavigationCtrl', ['$scope', '$location', function($scope, $location) {

	$scope.goTo = function(hash) {
		$location.path(hash);
	};
	
    $scope.ddSelectOptionsCreer = [
        {
            text: 'Référentiel',
            itemNumber: '1',
			href: '#/thesaurus'
        },
        {
            text: 'Enregistrement',
            itemNumber: '2',
			href: '#/node'
        }
    ];
	
	$scope.ddSelectOptionsImporter = [
        {
            text: 'Référentiel',
            itemNumber: '1',
			href: '#/importThesaurus'
        },
        {
            text: 'Relations',
            itemNumber: '2',
			href: '#/importRelations'
        }
    ];

}]);	

