angular.module('app').factory('currentUser', ['$location', '$http', '$rootScope', function ($location, $http, $rootScope) {
  'use strict';

  var currentUser;

  $http
    .get('/session', {})
    .error(function () {
      $location.path('/');
    })
    .success(function (res) {
      currentUser = res;
      $rootScope.$emit('userLoggedIn');
      $location.path('/feed');
    });

  return {
    get: function () {
      return currentUser;
    }
  };
}]);
