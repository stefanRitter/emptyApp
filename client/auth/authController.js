angular.module('app').controller('authController', ['$http', '$location', 'currentUser', function ($http, $location, currentUser) {
  'use strict';

  var vm = this;

  vm.signin = function () {
    if (!!vm.password && !!vm.email) {
      $http
        .post('/login', {email: vm.email, password: vm.password})
        .error(function (err) {
          vm.error = err.message;
        }) 
        .success(currentUser.login);
    }
  };

  vm.join = function () {
    if (!!vm.password && !!vm.email) {
      $http
        .post('/join', {email: vm.email, password: vm.password})
        .error(function (err) {
          vm.error = err.message;
        }) 
        .success(currentUser.login);
    }
  };
}]);
