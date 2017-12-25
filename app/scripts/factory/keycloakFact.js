'use strict';

(function(){

angular.module('store').factory('keycloak', function($window) {
  return $window._keycloak;
});

})();