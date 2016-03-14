angular.module('login.controller',[])
      .controller('loginCtrl',['$scope','$rootScope','$location','loginService', loginCtrl]);

function loginCtrl($scope,$rootScope,$location,loginService) {
 $scope.error ="";  
  $scope.login = function (){
    console.log();
         loginService.login($scope.credentials)
         .then(function(response) {  
          console.log(response);
            $location.path('/employee');                  
          }, function(rejected){
                  $scope.error="Invalid username/password";
          })
  };
  
};