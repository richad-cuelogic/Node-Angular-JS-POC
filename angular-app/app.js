
angular.module('angularApp', [
  'ngRoute',
  'login'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);



