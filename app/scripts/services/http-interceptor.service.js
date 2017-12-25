/**
 * Services communs de l'application
 * @namespace Factories
 */
(function () {
    'use strict';

    angular
        .module('store')
        .factory('httpInterceptor', [
            '$log','$q', '$rootScope', '$cacheFactory', '$injector','$location','keycloak', httpInterceptor
        ]);

    /**
     *
     * @param $q
     * @param $rootScope
     * @param NotificationService
     * @param $cacheFactory
     * @param $injector
     * @param EventLoginService
     * @returns {{request: Function, requestError: Function, response: Function, responseError: Function}}
     */
    function httpInterceptor($log,$q, $rootScope, $cacheFactory, $injector, $location,keycloak) {
        const TOKEN_KEY = 'Bearer ';
        const INDEX_STATE = 'index';
        const SOUMISSION_SELECTION_STATE = 'soumission.selection';
        const BACKEND_LOCKS = {
            soumissionLockBySoumissionaire: 'soumission.saisie.lock.by_soumissionnaire',
            soumissionLockByGestionnaire: 'soumission.saisie.lock.by_gestionnaire',
            soumissionLockByOtherGestionnaire: 'soumission.saisie.lock.by_other_gestionnaire',
            intervenantLockByUserConnected: 'intervenant.lock.userConnected',
            authUserLocked: 'auth.user.locked',
            authLockUserConnected: 'auth.lock.userConnected'
        };
        const HTTP_KEY = 'http.';

        return {
            request: function ($config) {
            	
                var deferred = $q.defer();
          	
            	var isRestCall = $config.url.indexOf('rest') >= 0;
        		var isImportCall = $config.url.indexOf('mvc') >= 0;
        		    		
        		if (keycloak !== null && isImportCall && angular.isDefined($rootScope.authentification)) {
        			$log.info('Expiration : ' + keycloak.isTokenExpired());
                    keycloak.updateToken(30).success(function () {
                         $config.headers.Authorization = TOKEN_KEY + keycloak.token;                        
                         deferred.resolve($config);
                    }).error(function () {
                        location.reload();
                    });
                    return deferred.promise;
                }         		
        		return $config;
            },
            requestError: function (request) {
                NotificationService.error('HTTP Requête erreur');
                $rootScope.loading = false;
                return $q.reject(request);
            },
            response: function (response) {

                return response || $q.when(response);
            },
            responseError: function (rejection) {
                if (rejection) {
                	var status = rejection.status;
	        		
	        		$rootScope.$broadcast('event:notAllowedAccess', rejection);
	        		return $q.reject(rejection);
                } else {
                    window.location.replace('error.html');
                }
                return $q.reject(response);
            }
        };
    }
})();
