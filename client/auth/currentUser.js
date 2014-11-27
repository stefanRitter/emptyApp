angular.module('app').factory('currentUser', ['$location', '$http', '$rootScope', function ($location, $http, $rootScope) {
  'use strict';

  var currentUser;

  function login (user) {
    currentUser = user;
    $rootScope.$emit('userLoggedIn');
    $location.path('/feed');
  }

  $http
    .get('/session', {})
    .error(function () {
      console.log('user not authenticated');
    })
    .success(login);

  return {
    get: function () {
      return currentUser;
    },
    login: login
  };
}]);
