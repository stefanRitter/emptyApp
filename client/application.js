angular.module('app', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'angular-loading-bar',
]);

angular.module('app').config(function ($routeProvider, $locationProvider) {
  'use strict';

  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/',        {templateUrl: '/assets/html/landingpage/show'})
    .when('/login',   {templateUrl: '/assets/html/auth/login'})
    .when('/join',    {templateUrl: '/assets/html/auth/join'})
    .when('/feed',    {templateUrl: '/assets/html/feed/show'})
    
    .otherwise({redirectTo: '/'});
});


angular.module('app').run(['$rootScope', '$location', 'currentUser', function ($rootScope, $location) {
  'use strict';

  $rootScope.$on('$routeChangeSuccess', function(){
    window.ga('send', 'pageview', $location.path());
  });
}]);
