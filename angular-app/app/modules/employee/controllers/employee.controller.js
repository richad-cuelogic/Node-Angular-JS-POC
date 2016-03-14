angular.module('employee.controller',[])
      .controller('employeeCtrl',['$scope','$routeParams','$rootScope','$location','$timeout','employeeService', employeeCtrl])

function employeeCtrl($scope,$routeParams,$rootScope,$location,$timeout,employeeService) { 
	$scope.employees = {};
  $scope.employeeList= function(){
    console.log("in controller");
         employeeService.employeeList().then(
              function(response) {
                console.log("after employee list response");
                 $scope.employees = response.data;
                 console.log( $scope.employees);
              }, function(rejected){
                $scope.error=rejected;
              } 
         );
};
      $scope.isEdit= false;
     if($routeParams.username){
     	$rootScope.username = $routeParams.username;
     	$scope.isEdit= true;
     }
   // if (apiLocalStorageService.isSupported()) {
      employeeService.employeeInfo($routeParams.username).then(
      	      function(response) {
      	         $scope.employee = response;
      	      }, function(rejected){
      	        $scope.error=rejected;
      	      } 
      	 );
   // }

     employeeService.employeeName($routeParams.username).then(
	      function(response) {
	         $scope.name = response;

	      }, function(rejected){
	        $scope.error=rejected;
	      } 
	 );
     /* if (apiLocalStorageService.isSupported()) {
         homeService.employeesList().then(
    	      function(response) {
    	         $rootScope.employees = response;

    	      }, function(rejected){
    	        $scope.error=rejected;
    	      } 
    	 );
      }*/
  	 $scope.updateEmployeeInfo = function (){
      $scope.inProcess = true;
       //if (apiLocalStorageService.isSupported()) {
        	 employeeService.updateEmployeeInfo($scope.employee).then(
      	      function(response) {
      	        $scope.employees = response;
                /* $timeout(function(){
                  $scope.inProcess = false;
                  $location.path('/home/');
                 }, 
                 3000);*/
      	      	  
                
      	      }, function(rejected){
      	        $scope.error=rejected;
      	      } 
      	 );
     // }
  	};
  	$scope.deleteEmployee = function (username){

  		 employeeService.deleteEmployee(username).then(
	      function(response) {
	         $rootScope.employees = response;

	      	$location.path('/employee/'+ $rootScope.username);

	      }, function(rejected){
	        $scope.error=rejected;
	      } 
	 	);
    };
  	$scope.addEmployee = function (){
       //if (apiLocalStorageService.isSupported()) {
        	 employeeService.addEmployeeInfo($scope.employee).then(
      	      function(response) {
      	        $rootScope.employees = response;
      	      	$location.path('/employee/'+ $rootScope.username);

      	      }, function(rejected){
      	        $scope.error=rejected;
      	      } 
      	 );
       // }
  	};
  	 
  $scope.editEmployeeRedirect = function(username){
        $location.path('/employee/employeeEdit/'+username);
  };
  $scope.editEmployeeSelected = function(index){
      if($scope.isSelected[index]){        
        $scope.isSelected[index] = false;
      }else{
        $scope.isSelected[index] = true;
      }
  };
/*
  $scope.clearLocalStorage = function() {
            apiLocalStorageService.clearAll();
             $location.path('/login');
             apiLocalStorageService.get('tokenid');
  }
*/
  /*multiple employee selection for delete start*/
  /* $scope.gridOptions = { 
        data: 'employees',
        showGroupPanel: true,
        jqueryUIDraggable: true
    };
     $scope.multipleDeletion = function(){
        var newEmployeeList=[];
        angular.forEach($scope.employees,function(val){
        if(!val.isDelete){
            newEmployeeList.push(val);
        }
    });    $scope.employees=newEmployeeList;
    };
*/
  /*multiple employee selection for delete end*/

  	$scope.predicate = "name";
    $scope.reverse = true;
    $scope.order = function() {
    	$scope.predicate = $scope.sortOption;
        $scope.reverse = ($scope.predicate === $scope.sortOption) ? !$scope.reverse : false;    
    };

};