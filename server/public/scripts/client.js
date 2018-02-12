var myApp = angular.module('myApp', ['ngRoute','ngMaterial','ngTable']);

/// Routes ///
myApp.config(['$routeProvider', '$locationProvider','ngTable', function($routeProvider, $locationProvider, ngTable) {
  console.log('myApp -- config')
  $routeProvider
    .when('/', {
      redirectTo: 'home'
    })
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as vm',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as vm'
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/info', {
      templateUrl: '/views/templates/info.html',
      controller: 'InfoController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    // .when('/test', {
    //   templateUrl: '/views/templates/test-login.html',
    //   controller:  'TestController as vm'
    // })
    .otherwise({
      template: '<h1>404</h1>'
    });
}]);
