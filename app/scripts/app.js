
(function () {

	'use strict';

/**
 * @ngdoc overview
 * @name rfaApp
 * @description
 * # rfaApp
 *
 * Main module of the application.
 */
angular
  .module('store', [
    'ui.bootstrap',                
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    // module bower at-table
    'angular-table',
    'ngSanitize',
    'ngTouch',
    'ngDropdowns',
	'ngDialog',
    'ngFileUpload',
	'bgf.paginateAnything',
//	'angularUtils.directives.dirPagination',
//	'digitalfondue.dftabmenu',	
    'angucomplete-alt'
// 'angularFileUpload',
//  'cgBusy'
  ]);
//.value('cgBusyDefaults',{
//  message:'Recherche en cours...',
//  })
})();

