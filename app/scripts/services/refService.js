'use strict';

angular.module('store').service('refService', ['$rootScope', '$http', '$log', function($rootScope, $http, $log) {
      this.getRef = function (type) {
    	  $log.debug("getRef");
          return $http.get($rootScope.config.APPLICATION_URL + '/store/mvc/getRef?type='+type);
      };
      
      
}]);

