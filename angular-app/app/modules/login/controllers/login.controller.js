angular.module('login.controller',['services'])
      .controller('loginCtrl',['$scope','loginService','$rootScope','$location', loginCtrl])

function loginCtrl($scope,loginService,$rootScope, $location) {
  $scope.error ="";
  $scope.login = function (){
         loginService.login($scope.username,$scope.password)
         .then(function(response) {  
            $location.path('/home');                  
          }, function(rejected){
                  $scope.error="Invalid username/password";
          })
  };
  
};